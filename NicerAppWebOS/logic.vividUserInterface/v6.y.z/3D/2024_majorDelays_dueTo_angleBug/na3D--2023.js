/*import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  CubeTextureLoader,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  LinearEncoding,
  LoaderUtils,
  LoadingManager,
  PMREMGenerator,
  PerspectiveCamera,
  RGBFormat,
  Scene,
  SkeletonHelper,
  UnsignedByteType,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from '/NicerAppWebOS/3rd-party/3D/libs/three.js/build/three.module.js';*/
import * as THREE from "three";

import { Stats } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/RGBELoader.js';
import { DragControls } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/controls/DragControls.js';
//import { GLTFLoader } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/loaders/GLTFLoader.js';
import { FlyControls } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/examples/jsm/controls/FlyControls.js';
import gsap from "https://unpkg.com/gsap@3.12.2/index.js";
import { CameraControls, approxZero } from '/NicerAppWebOS/3rd-party/3D/libs/three.js/dist_camera-controls.module.js';


export class na3D_portraitFrame {
    
    constructor (el, parent, centerX, centerY, centerZ, sizeX, sizeY, sizeZ) {
        
        var minX = centerX - Math.round(sizeX/2);
        var minY = centerY - Math.round(sizeY/2);
        var minZ = centerY - Math.round(sizeZ/2);
        var min = new Vector3 (minX, minY, minZ);
        
        var maxX = centerX + Math.round(sizeX/2);
        var maxY = centerY + Math.round(sizeY/2);
        var maxZ = centerY + Math.round(sizeZ/2);
        var max = new Vector3 (maxX, maxY, maxZ);
        
        this.box = new Box3 (min,max);
        return this;
    }
    
}


export class na3D_fileBrowser {
    constructor(el, parent, data) {
        var t = this;
        
        this.autoRotate = true;
        this.showLines = true;
        
        this.p = parent;
        this.el = el;
        this.t = $(this.el).attr('theme');
        this.data = data;
        this.loading = false;
        this.resizing = false;
        this.lights = [];
        this.folders = [];
        this.ld1 = {}; //levelDataOne
        this.ld2 = {}; //levelDataTwo
        this.settings = { pouchdb : {} };
        
        this.items = [ {
            name : 'backgrounds',
            offsetY : 0,
            offsetX : 0,
            offsetZ : 0,
            column : 0,
            row : 0,
            columnCount : 1,
            rowCount : 1,
            idxPath : ''
        } ];
        
        this.lines = []; // onhover lines only in here
        this.permaLines = []; // permanent lines, the lines that show all of the parent-child connections.
        
        var 
        c = $.cookie('3DFDM_lineColors');
        if (typeof c=='string' && c!=='') {
            this.lineColors = JSON.parse(c);
        }
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, $(el).width() / $(el).height(), 0.1, 10 * 1000 );

        this.renderer = new THREE.WebGLRenderer({alpha:true, antialias : true});
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setPixelRatio (window.devicePixelRatio);
        this.renderer.setSize( $(el).width()-20, $(el).height()-20 );
        this.renderer.toneMappingExposure = 1.0;
        
        el.appendChild( this.renderer.domElement );
        
        $(this.renderer.domElement).bind('mousemove', function() {
            //event.preventDefault(); 
            t.onMouseMove (event, t)
        });
        $(this.renderer.domElement).click (function(event) {  
            event.preventDefault(); 
            if (event.detail === 2) { // double click
                t.controls.autoRotate = !t.controls.autoRotate 
                if (t.controls.autoRotate) $('#autoRotate').removeClass('vividButton').addClass('vividButtonSelected'); 
                else $('#autoRotate').removeClass('vividButtonSelected').addClass('vividButton');
                    
            } else if (event.detail === 3) { // triple click
                if (t.controls.autoRotateSpeed<0) t.controls.autoRotateSpeed = 1; else t.controls.autoRotateSpeed = -1;
            }
            
        });
        $(document).on('keydown', function(event) {
            /*if (t.dragndrop && t.dragndrop.obj) {
                t.zoomInterval = setInterval(function() {
                    if (event.keyCode===16 || event.keyCode===38) {
                        for (let i=0; i<t.items.length; i++) {
                            let it = t.items[i];
                            if (it.parent === t.dragndrop.obj.it.parent) {
                                it.model.position.z -= 25;
                            }
                        }
                    };
                    if (event.keyCode===17 || event.keyCode===40) { 
                        for (let i=0; i<t.items.length; i++) {
                            let it = t.items[i];
                            if (it.parent === t.dragndrop.obj.it.parent) {
                                it.model.position.z += 25;
                            }
                        }
                    };
                }, 200);
            }*/
            if (event.keyCode===32) t.controls.autoRotate = !t.controls.autoRotate;
        });
        $(document).on('keyup', function(event) {
            event.preventDefault();
            clearInterval(t.zoomInterval);
        });
        
        this.loader = new GLTFLoader();
        this.initializeItems (this);//, this.items, this.data, 0, 0, 0, '0', '');

        const light1  = new THREE.AmbientLight(0xFFFFFF, 0.3);
        light1.name = 'ambient_light';
        light1.intensity = 0.3;
        light1.color = 0xFFFFFF;
        this.camera.add( light1 );

        const light2  = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
        light2.position.set(0.5, 0, 0.866); // ~60º
        light2.name = 'main_light';
        light2.intensity = 0.8 * Math.PI;
        light2.color = 0xFFFFFF;
        this.camera.add( light2 );
        
        this.lights.push(light1, light2);        
        
        this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        this.pmremGenerator.compileEquirectangularShader();
        
        //this.updateEnvironment(this);
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mouse.x = 0;
        this.mouse.y = 0;
        this.mouse.z = 0;

        this.camera.position.z = 700;
        this.camera.position.y = 200;
        
        this.animate(this);
    }
    
    animate(t) {
        requestAnimationFrame( function() { t.animate (t) } );
        if (t.mouse.x!==0 || t.mouse.y!==0) {        
            t.raycaster.setFromCamera (t.mouse, t.camera);
            
            const intersects = t.raycaster.intersectObjects (t.scene.children, true);
            //debugger;
            //if (intersects[0]) {
            if (intersects[0] && intersects[0].object.type!=='Line') 
            for (var i=0; i<1/*intersects.length <-- this just gets an endless series of hits from camera into the furthest reaches of what's visible behind the mouse pointer */; i++) {
                var hoveredItem = intersects[i].object, done = false;
                while (hoveredItem && !done) {
                
                    for (var j=0; j<t.lines.length; j++) {
                        if (t.lines[j]) {
                            if (t.lines[j].it === it) {
                                haveLine = true;
                            } else {
                                t.scene.remove(t.lines[j].line);
                                t.lines[j].geometry.dispose();
                                delete t.lines[j];
                            }
                        }
                    }

                    // build a line towards parent
                    if (hoveredItem && hoveredItem.it && !done) {
                        let p = hoveredItem.it.model.position;
                        t.hoverOverName = '('+hoveredItem.it.column+':'+hoveredItem.it.row+') ('+p.x+', '+p.y+', '+p.z + ') : ' + hoveredItem.it.name;
                        //t.hoverOverName = hoveredItem.it.name;
                    //debugger;    
                        var 
                        it = hoveredItem.it,
                        parent = t.items[it.parent],
                        haveLine = false;
                        
                        // draw line to parent(s)
                        while (it.parent && it.parent!==0 && typeof it.parent !== 'undefined') {
                            var 
                            parent = t.items[it.parent],
                            haveLine = false;
                            
                            if (parent && parent.model) {
                                if (!haveLine) {
                                    var 
                                    geometry = new THREE.Geometry(), 
                                    p1 = it.model.position, 
                                    p2 = parent.model.position;
                                    
                                    geometry.dynamic = true;
                                    geometry.vertices.push(p1);
                                    geometry.vertices.push(p2);
                                    geometry.verticesNeedUpdate = true;

                                    var material = new THREE.LineBasicMaterial({ color: 0xCCCCFF, linewidth:4 });
                                    var line = new THREE.Line( geometry, material );
                                    t.scene.add(line);

                                    t.lines[t.lines.length] = {
                                        it : it,
                                        line : line,
                                        geometry : geometry,
                                        material : material
                                    };
                                } else {
                                    for (var j=0; j<t.lines.length; j++) {
                                        if (t.lines[j]) t.lines[j].geometry.verticesNeedUpdate = true;
                                    }
                                }
                            }
                            it = t.items[it.parent];
                        }
                                                
                        // draw lines to children
                        for (var j=0; j<t.items.length; j++) {
                            var child = t.items[j];
                            if (
                                hoveredItem && hoveredItem.it && hoveredItem.it.model && child.model
                                && hoveredItem.it.idx === child.parent
                            ) {
                                var
                                geometry = new THREE.Geometry(), 
                                p1 = child.model.position, 
                                p2 = hoveredItem.it.model.position,
                                x = child.name;
                                
                                geometry.dynamic = true;
                                geometry.vertices.push(p1);
                                geometry.vertices.push(p2);
                                geometry.verticesNeedUpdate = true;

                                var material = new THREE.LineBasicMaterial({ color: 0x000050, linewidth : 4 });
                                var line = new THREE.Line( geometry, material );
                                t.scene.add(line);

                                t.lines[t.lines.length] = {
                                    it : it,
                                    line : line,
                                    geometry : geometry,
                                    material : material
                                };
                            }
                        }
                        done = true;
                    }
                    
                    hoveredItem = hoveredItem.parent;
                }
                
                // show folder name for item under mouse and closest to the country
                $('#site3D_label').html(t.hoverOverName).css({display:'flex'});
            }
            if (!intersects[0]) {
                $('#site3D_label').fadeOut();
            } else {
                if (intersects[0] && intersects[0].object && intersects[0].object.parent && intersects[0].object.parent.parent) {
                    var model = intersects[0].object.parent.parent.parent.parent.parent.parent;
                    model.rotation.z += 0.02; //TODO : auto revert back to model.rotation.z = 0;
                }
            }
        }
        
        if (t.controls) t.controls.update();

        for (var i=0; i<t.lines.length; i++) {
            var it = t.lines[i];
            if (it && it.geometry) it.geometry.verticesNeedUpdate = true;
        };
        for (var i=0; i<t.permaLines.length; i++) {
            var it = t.permaLines[i];
            if (it && it.geometry) it.geometry.verticesNeedUpdate = true;
        };

        
        t.renderer.render( t.scene, t.camera );
    }
    
    onMouseMove( event, t ) {
        var rect = t.renderer.domElement.getBoundingClientRect();
        t.mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
        t.mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;        
        t.mouse.layerX =  event.layerX;
        t.mouse.layerY =  event.layerY;

        $('#site3D_label').html(t.hoverOverName).css({ position:'absolute', padding : 10, zIndex : 5000, top : event.layerY + 10, left : event.layerX + 30 });
    }
    
    onMouseWheel( event, t ) {
        debugger;
    }

    initializeItems (t) {
        var p = { t : t, ld2 : {}, idxPath : "", idxPath2 : "/0" };
        t.s2 = [];
        na.m.walkArray (t.data, t.data, t.initializeItems_walkKey, t.initializeItems_walkValue, false, p);

        var innerWidth = $("#siteContent .vividDialogContent").width();
        var innerHeight = $("#siteContent .vividDialogContent").height() - $("#header").position().top - $("#header").height();
        t.renderer.setSize(innerWidth, innerHeight);
        na.m.waitForCondition ('3D camera available?', function() { return t.camera }, function() {
            t.camera.aspect = innerWidth / innerHeight;
            t.camera.updateProjectionMatrix();
            t.onresize(t);
        }, 100);
    }
    initializeItems_walkKey (cd) {
        var ps = cd.path.split("/");
        if (ps[ps.length-1]=="files") {
            //console.log ("initializeItems_walkKey", "files", cd);
        } else if (ps[ps.length-1]=="folders") {

            var
            lastParent = cd.params.t.items[0],
            pk = cd.path;
            if (!cd.params.ld2[pk]) cd.params.ld2[pk] = { levelIdx : 0 };
            for (var i=0; i<cd.params.t.items.length; i++) {
                var it2 = cd.params.t.items[i];
                if (it2.filepath+"/"+it2.name+"/folders" === cd.path) {
                    lastParent = it2;
                }
            }


            //debugger;
            if (cd.level <= 4) {
                cd.params.idxPath = "/0";// + cd.params.t.items.length;
            } else {
                var
                il1 = (cd.level - 4) / 2,
                il2 = cd.params.idxPath.split("/"),
                il3 = null,
                j = il2.length;

                for (var i=0; i<j; i++) {
                    if (parseInt(il2[i])===lastParent.idx) il3 = lastParent.idx;
                    if (il3) il2.pop();
                }

                cd.params.idxPath = il2.join("/") + "/" + lastParent.idx;
                cd.params.idxPath2 = cd.params.idxPath;
            };
            //debugger;

            var
            it = {
                level : cd.level,
                name : cd.k,
                idx : cd.params.t.items.length,
                idxPath : cd.params.idxPath,//localIdx + "/" + cd.params.t.items.length,
                filepath : cd.path,
                levelIdx : ++cd.params.ld2[pk].levelIdx,
                parent : lastParent,
                leftRight : 0,
                upDown : 0,
                columnOffsetValue : 1000,
                rowOffsetValue : 1000,
                model : { position : { x : 0, y : 0, z : 0 } },
                data : cd.at[cd.k]
            };
            if (!cd.k.match(/\/.mp3$/)) {
                console.log ("t779", it.filepath, it.name, it);
            };

            if (!cd.params.t.ld3) cd.params.t.ld3 = {};
            if (!cd.params.t.ld3[it.idxPath]) cd.params.t.ld3[it.idxPath] = { itemCount : 0, folderCount : 0, items : [] };
            if (!cd.params.t.ld3[it.idxPath].folderCount) cd.params.t.ld3[it.idxPath].folderCount = 0;
            cd.params.t.ld3[it.idxPath].folderCount++;
            cd.params.t.ld3[it.idxPath].itemCount++;
            cd.params.t.ld3[it.idxPath].items.push (it);
            //cd.params.idxPath2 = cd.params.idxPath + "/" + it1a.idx;
            cd.params.t.items.push (it);

            // display files :
            if (it.data.files)
            for (var fkey in it.data.files) {
                if (fkey.match(/\.mp3$/)) {
                    var p = null;

                    /*var ps2 = $.extend([],ps);
                    delete ps2[ps2.length-1];
                    var ps2Str = ps2.join("/");
                    var parent = it.parent;//na.m.chaseToPath (cd.root, ps2Str+"/files/"+fkey, false);*/
                    //var level = lastParent.level/2;//ps2.length;


                    var
                    //pk = cd.path+"/"+cd.k+"/"+fkey,
                    it1a = {
                        data : it.data.files[fkey],
                        level : cd.level+1,
                        name : fkey,
                        idx : cd.params.t.items.length,
                        idxPath : cd.params.idxPath + "/" + it.idx,// + "/" + cd.params.t.items.length,//cd.params.t.items.length,
                        filepath : cd.path+"/"+cd.k,
                        levelIdx : ++cd.params.ld2[pk].levelIdx,
                        parent : it,
                        leftRight : 0,
                        upDown : 0,
                        columnOffsetValue : 1000,
                        rowOffsetValue : 1000,
                        model : { position : { x : 0, y : 0, z : 0 } }
                    };

                    if (!cd.params.t.ld3) cd.params.t.ld3 = {};
                    if (!cd.params.t.ld3[it1a.idxPath]) cd.params.t.ld3[it1a.idxPath] = { itemCount : 0, items : [] };
                    cd.params.t.ld3[it1a.idxPath].itemCount++;
                    cd.params.t.ld3[it1a.idxPath].items.push (it1a);
                    cd.params.idxPath2 = cd.params.idxPath + "/" + it1a.idx;
                    cd.params.t.items.push (it1a);
                }
            }
        }
    }
    initializeItems_walkValue (cd) {
        //console.log ("initializeItems_walkValue", "cd", cd);
    }

    initializeFolderList (t, data) {
        var p = { t : t, ld2 : {}, data2 : t.itemsFolders };
        na.m.walkArray (data, data, t.initializeFolderView_walkKey, null, false, p);
        t.initializeFolderView (t, p.data2);
    }

    initializeFolderView_walkKey (cd) {
        var ps = cd.path.split("/");
        if (ps[ps.length-1]=="files") {
            //console.log ("initializeItems_walkKey", "files", cd);
        } else if (ps[ps.length-1]=="folders") {
            var
            lastParent = cd.params.t.itemsFolders[0],
            pk = cd.path;
            if (!cd.params.ld2[pk]) cd.params.ld2[pk] = { levelIdx : 0 };
            for (var i=0; i<cd.params.t.itemsFolders.length; i++) {
                var it2 = cd.params.t.itemsFolders[i];
                if (it2.filepath+"/"+it2.name+"/folders" === cd.path) {
                    lastParent = it2;
                }
            }


            //debugger;
            if (cd.level <= 4) {
                cd.params.idxPath = "/0";// + cd.params.t.itemsFolders.length;
            } else {
                var
                il1 = (cd.level - 4) / 2,
                il2 = cd.params.idxPath.split("/"),
                il3 = null,
                j = il2.length;

                for (var i=0; i<j; i++) {
                    if (parseInt(il2[i])===lastParent.idx) il3 = lastParent.idx;
                    if (typeof il3=="number") il2.pop();
                }

                cd.params.idxPath = il2.join("/") + "/" + lastParent.idx;
                cd.params.idxPath2 = cd.params.idxPath;
            };
            //debugger;
            var fit = {
                type : "naFolder",
                id : na.m.randomString(),
                parent : lastParent.id,
                text : cd.k,
                idx : cd.params.t.itemsFolders.length - 1,
                idxPath : cd.params.idxPath
            };

            if (!cd.params.t.fd3) cd.params.t.fd3 = {};
            if (!cd.params.t.fd3[fit.idxPath]) cd.params.t.fd3[fit.idxPath] = { itemCount : 0, itemsFolders : [] };
            cd.params.t.fd3[fit.idxPath].itemCount++;
            cd.params.t.fd3[fit.idxPath].itemsFolders.push (fit);
            //cd.params.idxPath2 = cd.params.idxPath + "/" + it1a.idx;
            cd.params.t.itemsFolders.push (fit);

            cd.params.data2.push (fit);
        }
    }

    initializeFolderView(t, foldersListForJStree) {
        var fv = $(".naFoldersList");
        if (!fv.is(".jstree"))
            fv.jstree ({
                core : {
                    data : foldersListForJStree,
                    check_callback : true
                },
                types : {
                    "naSystemFolder" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSystemFolder.png",
                        "valid_children" : []
                    },
                    "naUserRootFolder" : {
                        "max_depth" : 14,
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naUserRootFolder.png",
                        "valid_children" : ["naFolder", "naMediaAlbum", "naDocument"]
                    },
                    "naGroupRootFolder" : {
                        "max_depth" : 14,
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naGroupRootFolder.png",
                        "valid_children" : ["naFolder", "naMediaAlbum", "naDocument"]
                    },
                    "naFolder" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naFolder.png",
                        "valid_children" : ["naFolder", "naMediaAlbum", "naDocument"]
                    },
                    "naDialog" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSettings.png",
                        "valid_children" : []
                    },
                    "naSettings" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSettings.png",
                        "valid_children" : []
                    },
                    "naTheme" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naVividThemes.png",
                        "valid_children" : []
                    },
                    "naVividThemes" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naVividThemes.png",
                        "valid_children" : []
                    },
                    "naMediaAlbum" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naMediaAlbum.png",
                        "valid_children" : [ "naMediaAlbum" ]
                    },
                    "naDocument" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naDocument.png",
                        "valid_children" : []
                    },
                    "saApp" : {
                        "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naApp.png",
                        "valid_children" : []
                    }
                },
                plugins : [
                    "contextmenu", "dnd", "search", "state", "types", "wholerow"
                ]
            }).on("ready.jstree", function (e, data) {
                var tree = $(".naFoldersList").jstree(true);
                for (var i=0; i<tree.settings.core.data.length; i++) {
                    var it = tree.settings.core.data[i];
                    if (it.state && it.state.selected) tree.select_node(it._id);
                }
            }).on("open_node.jstree", function (e, data) {
                na.cms.onchange_folderStatus_openOrClosed(e, data);

            }).on("close_node.jstree", function (e, data) {
                na.cms.onchange_folderStatus_openOrClosed(e, data);

            }).on("rename_node.jstree", function (e, data) {
                na.cms.onchange_rename_node(e, data);

            }).on("changed.jstree", function (e, data) {

                if (
                    //data.action!=="ready"
                    //&&
                    /*data.action!=="model"
                    && */data.action!=="select_node"
                ) return false;

                $("#siteContent .vividTabPage").fadeOut("fast");
                clearTimeout(na.cms.settings.timeout_changed);
                na.cms.settings.timeout_changed = setTimeout (function(data) {
                    var l = data.selected.length, rec = null;
                    for (var i=0; i<l; i++) {
                        var d = data.selected[i], rec2 = data.instance.get_node(d);
                        if (rec2 && rec2.original) rec = rec2;
                    }

                    if (
                        na.cms.settings.current.selectedTreeNode
                        && rec
                        && na.cms.settings.current.selectedTreeNode.id!==rec.id
                        && na.cms.settings.current.selectedTreeNode.type=="naDocument"
                    ) na.cms.saveEditorContent(na.cms.settings.current.selectedTreeNode, function(){
                        na.cms.settings.current.selectedTreeNode = rec;
                        //na.cms.onchange_selectedNode (settings, data, rec, function() {
                            //na.cms.refresh(function() {
                        //      na.cms.onchange_jsTreeNode(settings, data,rec);
                            //});
                        //});
                    })
                    else if (rec) na.cms.onchange_jsTreeNode(settings, data, rec);

                    if (rec && rec.type=="naDocument") $("#document").fadeIn("slow");
                    if (rec && rec.type=="naMediaAlbum") $("#upload").fadeIn("slow");
                    if (
                        rec
                        && (
                            rec.type=="naDocument"
                            || rec.type=="naMediaAlbum"
                        )
                    ) {
                        if ($(window).width() < 400) {
                            na.cms.settings.current.activeDialog = "#siteContent";
                            arrayRemove(na.desktop.settings.visibleDivs, "#siteToolbarLeft");
                            arrayRemove(na.desktop.settings.visibleDivs, "#siteContent");
                            na.desktop.settings.visibleDivs.push("#siteContent");
                            na.desktop.resize();
                        } else {
                            na.cms.settings.current.activeDialog = "#siteContent";
                            arrayRemove(na.desktop.settings.visibleDivs, "#siteToolbarLeft");
                            arrayRemove(na.desktop.settings.visibleDivs, "#siteContent");
                            na.desktop.settings.visibleDivs.push("#siteToolbarLeft");
                            na.desktop.settings.visibleDivs.push("#siteContent");
                            na.desktop.resize();
                        };
                    }

                    na.site.settings.buttons["#btnAddUser"].disable();
                    na.site.settings.buttons["#btnAddGroup"].disable();
                    na.site.settings.buttons["#btnAddFolder"].disable();
                    na.site.settings.buttons["#btnAddDocument"].disable();
                    na.site.settings.buttons["#btnAddMediaAlbum"].disable();
                    na.site.settings.buttons["#btnDeleteRecord"].disable();

                    if (rec && rec.type=="naSystemFolder" && rec.text=="Users")
                        na.site.settings.buttons["#btnAddUser"].enable();


                    if (rec && rec.type=="naSystemFolder" && rec.text=="Groups")
                        na.site.settings.buttons["#btnAddGroup"].enable();


                    if (rec &&
                        (
                            rec.type=="naUserRootFolder"
                            || rec.type=="naGroupRootFolder"
                            || rec.type=="naFolder"
                        )
                    ) na.site.settings.buttons["#btnAddFolder"].enable();


                    if (rec &&
                        (
                            rec.type=="naFolder"
                        )
                    ) {
                        na.site.settings.buttons["#btnAddDocument"].enable();
                        na.site.settings.buttons["#btnAddMediaAlbum"].enable();
                    }

                    if (rec &&
                        (
                            rec.type=="naFolder"
                            || rec.type=="naDocument"
                            || rec.type=="naMediaAlbum"
                        )
                    ) na.site.settings.buttons["#btnDeleteRecord"].enable();
                }, 500, data);

                //clearTimeout (na.cms.settings.current.timeoutRefresh);
                //na.cms.settings.current.timeoutRefresh = setTimeout(na.cms.refresh,1000);

            }).on("move_node.jstree", function (e, data) {

                var
                tree = $("#jsTree").jstree(true),
                oldPath = na.cms.currentPath(tree.get_node(data.old_parent)),
                newPath = na.cms.currentPath(tree.get_node(data.parent)),
                url2 = "/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/cmsManager/ajax_moveNode.php",
                ac = {
                    type : "POST",
                    url : url2,
                    data : {
                        database : data.node.original.database,
                        oldParent : data.old_parent,
                        oldPath : oldPath,
                        newParent : data.parent,
                        newPath : newPath,
                        target : data.node.original._id || original.id
                    },
                    success : function (data, ts, xhr) {
                    },
                    error : function (xhr, textStatus, errorThrown) {
                        na.site.ajaxFail(fncn, url2, xhr, textStatus, errorThrown);
                    }
                };
                $.ajax(ac);

            });

    }

   onresize (t, levels) {
        if (!t) t = this;
        //debugger;
        t.onresize_do (t, levels);
       /*
        na.m.waitForCondition ("waiting for other onresize commands to finish",
            function () { return t.resizing === false; },
            function () { t.onresize_do (t, levels); },
            50
        );*/
    }


    onresize_do(t, callback) {
        t.resizing = true;
        t.overlaps = [];

        let
        c = {};
        t.ld4 = [];
        t.s2 = [];

        $(".na3D").css({
            width : $("#siteContent .vividDialogContent").width(),
            height : $("#siteContent .vividDialogContent").height()
        });

        for (var path in t.ld3) {
            t.ld4.push(path)
        }
        for (var i=0; i<t.ld4.length; i++) {
            var p1 = t.ld4[i].substr(1).split("/");

            setTimeout (function(p1, i) {
                var colorGradientScheme = {
                    themeName: "naColorgradientScheme_custom__"+p1.join("_"),
                    cssGeneration: {
                        colorTitle : "yellow",
                        colorLegend : "#00BBBB",
                        colorLegendHREF : "#00EEEE",
                        colorStatus : "goldenrod",
                        colorStatusHREF : "yellow",
                        colorLevels: {
                        0: {
                            background: "#7A95FF",
                            color: "rgb("
                                +(50+Math.random()*205)+","
                                +(50+Math.random()*205)+","
                                +(50+Math.random()*205)+")"
                        },
                        100: {
                            background: "white",
                            color: "rgb("
                                +(50+Math.random()*205)+","
                                +(50+Math.random()*205)+","
                                +(50+Math.random()*205)+")"
                        }
                        }
                    },
                    htmlTopLevelTableProps: ' cellspacing="5"',
                    htmlSubLevelTableProps: ' cellspacing="5"',
                    showFooter: true,
                    showArrayKeyValueHeader: false,
                    showArrayStats: true,
                    showArrayPath: true,
                    showArraySiblings: true,
                    jQueryScrollTo: {
                        duration: 900
                    }
                    }

                var list = naCG.generateList_basic (colorGradientScheme, p1.length);
                t.ld3[t.ld4[i]].colorList = list;
                t.ld3[t.ld4[i]].p1 = p1;
            }, i + (Math.random() * 500), p1, i);
        }
        na.m.waitForCondition("onresize_do_phase2()", function() {
            for (var i=0; i<t.ld4.length; i++) {
                if (!t.ld3[t.ld4[i]].colorList) return false;
            };
            var r = t.items.length > 2 && !t.started;
            //debugger;
            return r;
        }, function() {
            t.onresize_do_phase2 (t, callback);
        }, 25);
    }

    onresize_do_phase2(t, callback) {
        for (var path in t.ld3) {
            var ld3 = t.ld3[path];
            if (path!=="") {
                for (var i=0; i<ld3.items.length; i++) {
                    var
                    it = t.items[ld3.items[i].idx];

                    ld3.rowColumnCount = Math.ceil(Math.sqrt(ld3.itemCount));
                    ld3.cubeSideLengthCount = Math.ceil(Math.cbrt(ld3.itemCount));
                    var
                    pos = { x : 1, xField : 1, y : 1, yField : 1, z : 1 },

                    // 2D view
                    columnField = 1,
                    rowField = 1,

                    // 3D view
                    column = 1,
                    row = 1,
                    depth = 1;


                    //if (it.filepath=="siteMedia/backgrounds/tiled/active") debugger;
                    for (var j=0; j<ld3.items.length; j++) {
                        var it2 = t.items[ld3.items[j].idx];
                        if (
                            (it.parent ? it.parent === it2.parent : true)
                            && it2.levelIdx <= it.levelIdx
                        ) {
                            if (
                                column >= ld3.cubeSideLengthCount
                                && row >= ld3.cubeSideLengthCount
                            ) {
                                pos.z++;
                                depth++;
                                column = 1;
                                row = 1;
                            } else if (column >= ld3.cubeSideLengthCount) {
                                pos.y++;
                                pos.x = 1;
                                row++;
                                column = 1;
                            } else {
                                column++;
                                pos.x++;
                            }

                            if (columnField >= ld3.rowColumnCount) {
                                pos.yField++;
                                pos.xField = 1;
                                rowField++;
                                columnField = 1;
                            } else {
                                columnField++;
                                pos.xField++;
                            }


                        }
                    };

                    it.rowField = rowField;
                    it.columnField = columnField;
                    it.row = row;
                    it.column = column;
                    it.depth = depth;
                    it.pos = pos;
                    it.ld3 = ld3;
                    //if (it.name=="gull" || it.name=="owl") debugger;
                }
            }
            //debugger;
        }

        var
        its = $.extend( [], t.items ),
        its2 = [],
        compare = function (a, b) {
            return a.parent-b.parent;
        },
        compare1 = function (a, b) {
            if (a.it && b.it) {
                return a.it.level-b.it.level;
            } else return 0;
        };

        its.sort (compare1);


        var
        x = t.data, // x[a][b][c].it
        maxLevel = 0;

        for (var i=0; i<its.length; i++) {
            if (maxLevel < its[i].level) maxLevel = its[i].level;
            for (var j=0; j<its.length; j++) {

                var
                name = "",
                parent = t.hovered;

                while (parent) {
                    //$("#site3D_label")[0].textContent =
                    //  t.hovered.object.it.name.replace(/-\s*[\w]+\.mp3/, ".mp3");
                    var li =
                        parent.object.it.filepath
                            .replace("/0/filesAtRoot/folders/","")
                            .replace("/0/filesAtRoot/folders","");
                    if (li!=="") li+= "/";
                    li += parent.object.it.name.replace(/\s*-\s*[-_\w]+\.mp3$/,".mp3")
                    //l += " ("+parent.object.it.parent.rndz+")";
                    li = li.replace(/folders\//g, "");

                    var lj =
                        its[j].filepath
                            .replace("/0/filesAtRoot/folders/","")
                            .replace("/0/filesAtRoot/folders","");
                    if (lj!=="") lj+= "/";
                    lj += its[j].name.replace(/\s*\-\s*[-_\w]+\.mp3$/,".mp3")
                    //l += " ("+parent.object.it.parent.rndz+")";
                    lj = lj.replace(/folders\//g, "");

                    parent = parent.parent;
                }

                if (
                    //its[i].idxPath+"/"+its[i].idx === its[j].idxPath+"/"+its[j].idx
                    //its[i].idxPath === its[j].idxPath
                    //its[i].filepath === its[j].filepath
                    //&& its[i].name === its[j].name
                    /*
                    its[i].pos.x === its[j].pos.x
                    && its[i].pos.y === its[j].pos.y
                    && its[i].pos.z === its[j].pos.z*/
                    li === lj
                ) {
                    var
                    ita = {
                        level: its[i].level,
                        maxColumn : Math.max( its[i].columnField, its[j].columnField ),
                        maxRow : Math.max( its[i].rowField, its[j].rowField ),
                        maxDepth : Math.max ( its[i].depth, its[j].depth )
                    };
                    if (ita.maxColumn === its[i].columnField) ita.maxColumnIt = its[i]; else ita.maxColumnIt = its[j];
                    if (ita.maxRow === its[i].rowField) ita.maxRowIt = its[i]; else ita.maxRowIt = its[j];
                    if (ita.maxDepth === its[i].depth) ita.maxDepthIt = its[i]; else ita.maxDepthIt = its[j];
                    its[i].maxColumnIta = ita;
                    its[i].maxRowIta = ita;
                    its[i].maxDepthIta = ita;
                    its[j].maxColumnIta = ita;
                    its[j].maxRowIta = ita;
                    its[j].maxDepthIta = ita;

                    its2.push (ita);
                }
            }
        }
        var
        compare2 = function (a,b) {
            var x = b.maxColumn - a.maxColumn;
            if (x === 0) return b.maxRow - a.maxRow; else return x;
        },
        its3 = its2.sort (compare2);

        var pox = {}, poy = {}, poz = {}, pd = {};
        if (t.items.length > 2)
        for (var i=0; i<t.items.length; i++) {
            var
            offsetXY = 200,
            it = t.items[i],
            p = (it.parent ? it.parent : null),
            p1 = (it.parent && it.parent.parent ? it.parent.parent : null),
            rndMax = 500 + (it.ld3 ? (it.ld3.rowColumnCount * 300) : 0);

            if (p && !pox[p.idx]) pox[p.idx] = Math.abs(Math.random() * rndMax);
            if (p && !poy[p.idx]) poy[p.idx] = Math.abs(Math.random() * rndMax);
            if (p && !poz[p.idx]) poz[p.idx] = Math.abs(Math.random() * rndMax);

            //if (p && !pox[p.idx]) pox[p.idx] = it.level * p.columnOffsetValue;
            //if (p && !poy[p.idx]) poy[p.idx] = it.level * p.rowOffsetValue;
            //if (p && !poz[p.idx]) poz[p.idx] = it.level * 500;

            if (p) var rndx = pox[p.idx]; else var rndx = 0;
            if (p) var rndy = poy[p.idx]; else var rndy = 0;
            if (p) var rndz = poz[p.idx]; else var rndz = 0;
            it.rndx = rndx;
            it.rndy = rndy;
            it.rndz = rndz;

            if (p) {
                var
                itmaxc = it.maxColumnIta.maxColumn,
                itmaxr = it.maxRowIta.maxRow,
                itmaxd = it.maxRowIta.maxDepth,
                itmaxc2 = Math.floor(itmaxc/2),
                itmaxr2 = Math.floor(itmaxr/2),
                itLeftRight = /*p.leftRight * */(
                    it.column-1 == itmaxc / 2
                    ? 0
                    : itmaxc===1
                        ? 0
                        : itmaxc - it.column == it.column -1
                            ? 0
                            : itmaxc - it.column < it.column - 1
                                ? 1
                                : -1
                            ),
                itUpDown = /*p.upDown * */(
                    it.row-1 == itmaxr/2
                    ? 0
                    : itmaxr===1
                        ? 0
                        : itmaxr - it.row == it.row - 1
                            ? 0
                            : itmaxr - it.row < it.row - 1
                                ? 1
                                : -1
                            ),
                itBackForth = /*p.upDown * */(
                    it.depth-1 == itmaxd/2
                    ? 0
                    : itmaxd===1
                        ? 0
                        : itmaxd - it.depth == it.depth - 1
                            ? 0
                            : itmaxr - it.depth < it.depth - 1
                                ? 1
                                : -1
                            ),
                itc = (itmaxc - 1 - it.columnField),
                itr = (itmaxr - 1 - it.rowField),
                itd = (itmaxd - 1 - it.depth);
                it.columnOffsetValue = itc;//Math.floor(itc);
                if (itc==18) debugger;
                it.rowOffsetValue = itr;//Math.floor(itr);
                it.depthOffsetValue = itd;//Math.floor(itr);
                it.leftRight = itLeftRight;
                it.upDown = itUpDown;
                it.backForth = itBackForth;

            } else {
                var mc = 0, mr = 0;

                var
                itmaxc = it.maxRowIta.maxColumn,
                itmaxr = it.maxRowIta.maxRow,
                itmaxd = it.maxRowIta.maxDepth,
                itLeftRight = /*p.leftRight * */(
                    it.column-1 == itmaxc / 2
                    ? 0
                    : itmaxc===1
                        ? 0
                        : itmaxc - it.column == it.column -1
                            ? 0
                            : itmaxc - it.column < it.column - 1
                                ? 1
                                : -1
                            ),
                itUpDown = /*p.upDown * */(
                    it.row-1 == itmaxr/2
                    ? 0
                    : itmaxr===1
                        ? 0
                        : itmaxr - it.row == it.row - 1
                            ? 0
                            : itmaxr - it.row < it.row - 1
                                ? 1
                                : -1
                            ),
                itBackForth = /*p.upDown * */(
                    it.depth-1 == itmaxd/2
                    ? 0
                    : itmaxd===1
                        ? 0
                        : itmaxd - it.depth == it.depth - 1
                            ? 0
                            : itmaxr - it.depth < it.depth - 1
                                ? 1
                                : -1
                            ),
                itc = (itmaxc - 1 - it.columnField),
                itr = (itmaxr - 1 - it.rowField),
                itd = (itmaxd - 1 - it.depth);

                it.columnOffsetValue = itc;//Math.floor(itc);
                it.rowOffsetValue = itr;//Math.floor(itr);
                it.depthOffsetValue = itd;//Math.floor(itr);
                it.leftRight = itLeftRight;
                it.upDown = itUpDown;
                it.backForth = itBackForth;
                //if (it.name=="landscape") debugger;
            };



            var
            z = (it.level/4) * 1000,//(it.level < 2 ? 1 : it.level-2) * 200 / 2,
            //z = -1 * it.depthOffsetValue * 2500,
            //plc = p.columnOffsetValue === 0 ? 0.01 : p.columnOffsetValue,
            //plr = p.rowOffsetValue === 0 ? 0.01 : p.rowOffsetValue,
            m = 10 * 1000,
            ilc = (p?p.columnOffsetValue * m:it.columnOffsetValue*m), //it.leftRight * it.column,// * p.columnOffsetValue,
            ilr = (p?p.rowOffsetValue * m:it.columnOffsetValue*m),//it.upDown * it.row,// * p.rowOffsetValue,

            min = 2, m0 = (it.level-2) < 5 ? it.level-2 : 4, m1 = 500, m2 = 500, m1a = 500, m2a =  500, m3a = 500, m3b = 500, m3c = 1000, m3d = 2500, n = 0.5, n1 = 500, n2 = 500, o = 1, s = 1,
            u = 1 * (p && p.leftRight===0?ilc:(p?p.leftRight:it.leftRight)),
            v = 1,
            w = 1 * (p && p.upDown===0?ilr:(p?p.upDown:it.upDown)),
            x = 1,
            u2 = (p?p.columnOffsetValue:it.columnOffsetValue),
            v2 = (p?p.rowOffsetValue:it.rowOffsetValue),
            w2 = (p?p.depthOffsetValue:it.depthOffsetValue),
            u2a = it.column,
            v2a = it.row,
            w2a = it.depth,
            divider = 1;

            /*
            if (p) {
                u = p.leftRight;
                w = p.upDown;
                u2 = -1 * p.columnOffsetValue;
                v2 = -1 * p.rowOffsetValue;
                w2 = -1 * p.depthOffsetValue;
                u2 = p.columnField;
                v2 = p.rowField;
                w2 = p.depth;
            }
*/

//if (it.name.match(/becoming insane/i)) debugger;
            if (it.model) {
                if (it.name.match(/\.mp3$/)) {
                    if (!t.showFiles) { /*delete it.model;*/} else {
                        it.model.position.x = Math.round( (
                            p.model.position.x
                            + (p.columnOffsetValue * 3500)
                            + ((it.column-1)*500)
                            + (p.ld3 && it.ld3 ? (p.columnOffsetValue* it.ld3.cubeSideLengthCount * 500) : 0)
                            //+ (it.ld3 ? (it.columnOffsetValue * it.ld3.cubeSideLengthCount * 500) : 0)
                        ) / divider);
                        it.model.position.y = Math.round( (
                            p.model.position.y
                            + (p.rowOffsetValue * 3500)
                            + ((it.row-1)*500)
                            + (p.ld3 && it.ld3 ? (p.rowOffsetValue * it.ld3.cubeSideLengthCount * 500) : 0)
                            //+ (it.ld3 ? (it.columnOffsetValue * it.ld3.cubeSideLengthCount * 500) : 0)
                        ) / divider);
                        it.model.position.z = Math.round( (
                            (p.model.position.z ? p.model.position.z : 0)
                            + (it.depth*500)
                            + (it.level > min ? -1 * p.depthOffsetValue * it.level*1000 : 0)
                        ) / divider);
                    }

                } else if (it.model && p && p1) {
                    it.model.position.x = Math.round( (
                        p.model.position.x
                        + (p.columnOffsetValue * 300)
                        + (p.column * p.ld3.cubeSideLengthCount * 200)
                        + (it.ld3.cubeSideLengthCount * 200)
                        + ((it.column)<500)
                        + (it.level > min ? rndx : 0)
                    ) / divider);
                    it.model.position.y = Math.round( (
                        p.model.position.y
                        //+ (p.rowOffsetValue * 300)
                        //+ (p.row * p.ld3.cubeSideLengthCount * 200)
                        //+ (it.ld3.cubeSideLengthCount * 200)
                        + ((it.column)<500)
                        + (it.level > min ? rndx : 0)
                        + ((it.row) * 500)
                        + (it.level > min ? rndy : 0)
                    ));
                    it.model.position.z = p.model.position.z - (1 *  500) / divider;
                    console.log ("t555p1", it.filepath, it.name, it.model.position);
                    //if (it.name.match("Relaxation")) debugger;
                } else if (it.model && p && p.model) {


                    it.model.position.x = Math.round( (
                        p.model.position.x
                        + (p.columnOffsetValue * 300)
                        + (p.ld3?p.column*p.ld3.cubeSideLengthCount * 200:0)
                        + (it.ld3.cubeSideLengthCount * 200)
                        + ((it.column) * 500)
                        + (it.level > min ? rndx : 0)

                        //+ (it.columnField * 500)
                    ) / divider);
                    it.model.position.y = Math.round( (
                        p.model.position.y
                        //+ (p.rowOffsetValue * 300)
                        //+ (p.ld3?p.row*p.ld3.cubeSideLengthCount * 200:0)
                        //+ (it.ld3.cubeSideLengthCount * 200)
                        + ((it.row) * 500)
                        + (it.level > min ? rndy : 0)
                    ) / divider);
                    it.model.position.z = p.model.position.z - (1 * 500) / divider;
                    console.log ("t555p", it.filepath, it.name, it.model.position);
                    //if (it.name.match("Relaxation")) debugger;
                } else if (it.model) {
                    it.model.position.x = it.columnField  * 500;
                    it.model.position.y = it.rowField  * 500;
                    it.model.position.z = 0;
                }
            }

            if (it.model) {
                var dbg = {
                    pos : it.pos,
                    px : it.model.position.x,
                    py : it.model.position.y,
                    pz : it.model.position.z,
                    it : it
                };
                //console.log ("t750", it.filepath, it.name, dbg);
            }
        }

        var
        sideLength = 100, length = sideLength, width = sideLength,
        shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );

        var extrudeSettings = {
        steps: 40,
        depth: sideLength,
        bevelEnabled: true,
        bevelThickness: 40,
        bevelSize: 40,
        bevelOffset: 0,
        bevelSegments: 40
        };

        for (var j=0; j<t.items.length; j++) {
            var p = t.items[j].idxPath;
            var p2 = p.substr(1).split("/");
            if (t.ld3[p]) {
                var list = t.ld3[p].colorList;
                var p1 = t.ld3[p].p1;
                var it = t.items[j];
                if (it) {
                    //if (it.name.match(/SABATON/)) debugger;
                    if (it.parent && it.parent) {
                        for (var k=0; k<list.length; k++) {
                            if (p1[k]==it.parent.idx) {
                                it.color = list[k].color;
                            }
                        }
                    }
                    if (!it.color) {
                        for (var k=0; k<list.length; k++) {
                            if (p1[k]==it.idx)
                                it.color = list[k].color;
                        }
                    }
                    //console.log ("t321", it.name, it.color);

                    var sideLength = 300, length = sideLength, width = sideLength;
                    var
                    materials2 = [
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        }),
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        }),
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        }),
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        }),
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        }),
                        new THREE.MeshBasicMaterial({
                            color : it.color ? it.color : "rgb(0,0,255)",
                            opacity : 0.5,
                            transparent : true
                        })

                    ];
                    if (it.parent) {
                        // parent/current folder :
                        if (it.name.match(/\.mp3$/)) {
                            if (t.showFiles)
                            var cube = new THREE.Mesh( new THREE.BoxGeometry( t.meshLength, t.meshLength, t.meshLength ), materials2 );
                        } else {
                            var cube = t.createSphere (t.meshLength * 3, it.color?it.color:"rgb(0,255,0)");
                        }
                        if (t.showFiles || !it.name.match(/\.mp3$/)) {
                            cube.it = it;
                            cube.position.x = it.model.position.x;
                            cube.position.y = it.model.position.y;
                            cube.position.z = it.model.position.z;
                            t.scene.remove(it.model);
                            //if (it.name.match("SABATON")) debugger;
                            it.model = cube;
                            t.scene.add( cube );
                            t.s2.push(cube);
                            //t.items.push (it);
                        }
                    } else {
                        var cube = t.createSphere(t.meshLength * 3, it.color);
                        cube.it = it;
                        cube.position.x = it.model.position.x;
                        cube.position.y = it.model.position.y;
                        cube.position.z = it.model.position.z;
                        it.model = cube;
                        t.scene.add( cube );
                        t.s2.push(cube);
                    }
                }
            }
        }

        t.onresize_postDo(t, true);
    }

    createSphere (size, color) {
        const geometry = new THREE.SphereGeometry( size/3, size/3, size/3 );
        const material = new THREE.MeshBasicMaterial( { color: color } );
        const sphere = new THREE.Mesh( geometry, material );

        return sphere;
    }


    createDodecahedron (size, color) {
        var g = new THREE.DodecahedronGeometry(size);

        const base = new THREE.Vector2(0, 0.5);
        const center = new THREE.Vector2();
        const angle = THREE.MathUtils.degToRad(72);
        var baseUVs = [
            base.clone().rotateAround(center, angle * 1).addScalar(0.5),
            base.clone().rotateAround(center, angle * 2).addScalar(0.5),
            base.clone().rotateAround(center, angle * 3).addScalar(0.5),
            base.clone().rotateAround(center, angle * 4).addScalar(0.5),
            base.clone().rotateAround(center, angle * 0).addScalar(0.5)
        ];

        var uvs = [];
        var sides = [];
        for (var i = 0; i < 12; i++) {
            uvs.push(
                baseUVs[1].x, baseUVs[1].y,
                baseUVs[2].x, baseUVs[2].y,
                baseUVs[0].x, baseUVs[0].y,

                baseUVs[2].x, baseUVs[2].y,
                baseUVs[3].x, baseUVs[3].y,
                baseUVs[0].x, baseUVs[0].y,

                baseUVs[3].x, baseUVs[3].y,
                baseUVs[4].x, baseUVs[4].y,
                baseUVs[0].x, baseUVs[0].y
            );
            sides.push(i, i, i, i, i, i, i, i, i);
        };
        g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
        g.setAttribute("sides", new THREE.Float32BufferAttribute(sides, 1));

        var m = new THREE.MeshStandardMaterial({
            roughness: 0.25,
            metalness: 0.75,
            color : (color?color:"#0000FF"),
            emissive : (color?color:"#00FF00"),
            opacity : 0.5,
            transparent : true
        });
        var o = new THREE.Mesh(g, m);
        return o;
    }

    createTexture(){
        let c = document.createElement("canvas");
        let step = 250;
        c.width = step * 16;
        c.height = step;
        let ctx = c.getContext("2d");
        ctx.fillStyle = "#7f7f7f";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "aqua";
        ctx.textBaseline = "middle";
        for (let i = 0; i < 12; i++){
            ctx.fillText(i + 1, step * 0.5 + step * i, step * 0.5);
        }

        return new THREE.CanvasTexture(c);
    }

    onresize_postDo (t, animate=false) {
        t.drawLines(t);
        //t.controls._camera.lookAt (t.s2[0].position);

        t.winners = {
            north : 0,
            east : 0,
            south : 0,
            west : 0,
            front : 0,
            behind : 0
        };
        for (var i=0; i < t.items.length; i++) {
            var it = t.items[i];
            if (!it.model) continue;
            if (it.model.position.y > t.winners.north) t.winners.north = it.model.position.y;
            if (it.model.position.x > t.winners.east) t.winners.east = it.model.position.x;
            if (it.model.position.y < t.winners.south) t.winners.south = it.model.position.y;
            if (it.model.position.x < t.winners.west) t.winners.west = it.model.position.x;
            if (it.model.position.z > t.winners.front) t.winners.front = it.model.position.z;
            if (it.model.position.z < t.winners.behind) t.winners.behind = it.model.position.z;
        };
        var
        tf = t.winners.behind + Math.round((t.winners.behind - t.winners.front) / 2),
        ol = 10 * 1000,
        numPoints = 720,
        radius = 10*1000;
        t.middle = {
            x : Math.round((t.winners.west + t.winners.east) / 2),
            y : Math.round((t.winners.north + t.winners.south) / 2),
            z : Math.round((t.winners.front + t.winners.behind) /2)
        };
        //t.flyControls.object.lookAt (new THREE.Vector3( t.middle.x, t.middle.y, t.middle.z));

        t.cameraOrigin = {
            x : t.middle.x,
            y : t.middle.y,
            z : t.middle.z * 5
        };

        if (true) {
            if (false && !t.started) {

                /*
                t.fpControls.object.position.x = 0;
                t.fpControls.object.position.y = t.middle.y;
                t.fpControls.object.position.z = -10*1000;
                t.fpControls.object.lookAt(
                    t.cameraOrigin.x,
                    t.cameraOrigin.y,
                    t.cameraOrigin.z
                );
                */

                var tar = t.controls._targetEnd.clone();
                tar.set(0,0,0).applyQuaternion(t.camera.quaternion).add(t.camera.position);


                t.controls.setLookAt (
                    t.cameraOrigin.x,
                    t.cameraOrigin.y,
                    t.cameraOrigin.z,
                    tar.x,
                    tar.y,
                    tar.z,
                    false
                );
                t.started = true;
            };
            console.log ("t778", t.winners, t.middle);


            t.curve1b = new THREE.CatmullRomCurve3( [
                new THREE.Vector3 (0, 0, ol),
                new THREE.Vector3 (t.winners.west - ol, 0, ol),
                new THREE.Vector3 (t.winners.west - ol, 0, t.winners.front - ol),
                new THREE.Vector3 (t.winners.east + ol, 0, t.winners.front - ol),
                new THREE.Vector3 (t.winners.east + ol, 0, ol),
                new THREE.Vector3 (0, 0, ol),
            ]);
            var first = last = {x:0,y:0,z:-ol};
            t.points1b = t.curve1b.getPoints(numPoints);
            t.curves1a = [
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z),
                new THREE.Vector3(first.x,first.y,first.z)
            ];
            t.curve1a = new THREE.CatmullRomCurve3(t.curves1a);
            t.points1a = t.curve1a.getPoints(50);
            t.curves1z = [
                new THREE.Vector3(last.x,last.y,last.z),
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z)
            ];
            t.curve1z = new THREE.CatmullRomCurve3(t.curves1z);
            t.points1z = t.curve1z.getPoints(50);

            t.curves1x = t.points1a.concat (t.points1b, t.points1z);
            t.curve1 = new THREE.CatmullRomCurve3(t.curves1x);
            t.points1 = t.curve1.getPoints(numPoints);



            t.curves2b = [];
            for (var i=0; i<numPoints; i++) {
                var
                x = radius * Math.cos (2 * Math.PI * i / numPoints),
                y = radius * Math.sin (2 * Math.PI * i / numPoints),
                z = 1.4 * radius;
                z = t.middle.z - (radius * Math.sin (2 * Math.PI * i / numPoints) / 2);
                if (i===0) var first = {x:x,y:y,z:z};
                if (i===numPoints-1) var last = {x:x,y:y,z:z};
                t.curves2b.push (new THREE.Vector3(x,y,z));
            }
            t.curves2a = [
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z),
                new THREE.Vector3(first.x,first.y,first.z)
            ];
            t.curve2a = new THREE.CatmullRomCurve3(t.curves2a);
            t.points2a = t.curve2a.getPoints(50);
            t.curves2z = [
                new THREE.Vector3(last.x,last.y,last.z),
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z)
            ];
            t.curve2z = new THREE.CatmullRomCurve3(t.curves2z);
            t.points2z = t.curve2z.getPoints(50);

            t.curves2x = t.points2a.concat (t.curves2b, t.points2z);
            t.curve2 = new THREE.CatmullRomCurve3(t.curves2x);
            t.points2 = t.curve2.getPoints(numPoints);

            t.curves3b = [];
            for (var i=0; i<numPoints; i++) {
                var
                x = radius * Math.cos (2 * Math.PI * i / numPoints),
                y = radius * Math.sin (2 * Math.PI * i / numPoints),
                z = 1.4 * radius;
                z = t.middle.z - (radius * Math.sin (2 * Math.PI * i / numPoints) / 2);
                if (i===0) var first = {x:x,y:y,z:z};
                if (i===numPoints-1) var last = {x:x,y:y,z:z};
                t.curves3b.push (new THREE.Vector3(x,y,z));
            }
            t.curve3b = new THREE.CatmullRomCurve3(t.curves3b);
            t.points3b = t.curve3b.getPoints(numPoints);
            t.curves3a = [
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z),
                new THREE.Vector3(first.x,first.y,first.z)
            ];
            t.curve3a = new THREE.CatmullRomCurve3(t.curves3a);
            t.points3a = t.curve3a.getPoints(50);
            t.curves3z = [
                new THREE.Vector3(last.x,last.y,last.z),
                new THREE.Vector3(t.cameraOrigin.x,t.cameraOrigin.y,t.cameraOrigin.z)
            ];
            t.curve3z = new THREE.CatmullRomCurve3(t.curves3z);
            t.points3z = t.curve3z.getPoints(50);

            t.curves3x = t.points3a.concat (t.points3b, t.points3z);
            t.curve3 = new THREE.CatmullRomCurve3(t.curves3x);
            t.points3 = t.curve3.getPoints(numPoints);

/*
            if (!t.dragndrop) {
                t.orbitControls.center =  new THREE.Vector3(
                    t.middle.x,
                    t.middle.y,
                    t.middle.z
                );
                //t.controls._target.copy (t.middle);
            }
*/
    /*
            const geometry = new THREE.BufferGeometry().setFromPoints( t.points );
            const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            // Create the final object to add to the scene
            const curveObject = new THREE.Line( geometry, material );
            t.scene.add(curveObject);


            const geometry2 = new THREE.BufferGeometry().setFromPoints( t.points2 );
            const material2 = new THREE.LineBasicMaterial( { color: 0xffffff } );
            // Create the final object to add to the scene
            const curveObject2 = new THREE.Line( geometry2, material2 );
            t.scene.add(curveObject2);
    */

            t._tmp = new THREE.Vector3();
            t.animationProgress = { value: 0 };
            /*
            t.pathAnimation = gsap.fromTo(
                t.animationProgress,
                {
                    value: 0,
                },
                {
                    value: 1,
                    duration: t.animationDuration,
                    overwrite: true,
                    paused: true,
                    onUpdateParams: [ t.animationProgress ],
                    onUpdate( { value } ) {

                        if ( ! this.isActive() ) return;

                        t.curve1.getPoint ( value, t._tmp );
                        t.controls.setLookAt(
                            t._tmp.x,
                            t._tmp.y,
                            t._tmp.z,
                            t.middle.x,
                            t.middle.y,
                            t.middle.z,
                            false, // IMPORTANT! disable cameraControls"s transition and leave it to gsap.
                        );

                    },
                    onStart() {
                        t.animPlaying = true;
                    },
                    onComplete() {
                        t.animPlaying = false;
                        t.onresize_postDo(t);
                    }
                }
            );

            t._tmp2 = new THREE.Vector3();
            t.animationProgress2 = { value: 0 };
            t.pathAnimation2 = gsap.fromTo(
                t.animationProgress2,
                {
                    value: 0,
                },
                {
                    value: 1,
                    duration: t.animationDuration,
                    overwrite: true,
                    paused: true,
                    onUpdateParams: [ t.animationProgress2 ],
                    onUpdate( { value } ) {

                        if ( ! this.isActive() ) return;

                        t.curve2.getPoint ( value, t._tmp2 );
                        t.controls.setLookAt(
                            t._tmp2.x,
                            t._tmp2.y,
                            t._tmp2.z,
                            t.middle.x,
                            t.middle.y,
                            t.middle.z,
                            false, // IMPORTANT! disable cameraControls"s transition and leave it to gsap.
                        );

                    },
                    onStart() {
                        t.animPlaying = true;
                        t.flyControls.enabled = false;
                        t.controls.enabled = false;
                    },
                    onComplete() {
                        t.animPlaying = false;
                        t.onresize_postDo(t);
                    }
                }
            );

            t._tmp3 = new THREE.Vector3();
            t.animationProgress3 = { value: 0 };
            t.pathAnimation3 = gsap.fromTo(
                t.animationProgress3,
                {
                    value:  0,
                },
                {
                    value: 1,
                    duration: t.animationDuration,
                    overwrite: true,
                    paused: true,
                    onUpdateParams: [ t.animationProgress3 ],
                    onUpdate( { value } ) {

                        if ( ! this.isActive() ) return;

                        t.curve3.getPoint ( value, t._tmp3 );
                        t.controls.setLookAt(
                            t._tmp3.x,
                            t._tmp3.y,
                            t._tmp3.z,
                            t.middle.x,
                            t.middle.y,
                            t.middle.z,
                            false, // IMPORTANT! disable cameraControls"s transition and leave it to gsap.
                        );

                    },
                    onStart() {
                        t.animPlaying = true;
                    },
                    onComplete() {
                        t.animPlaying = false;
                        t.onresize_postDo(t);
                    }
                }
            );

            /*
            setTimeout (function() {

                if (!t.started2) {
                    t.started2 = true;
                    //t.controls.enabled = true;
                    //if (animate) t.pathAnimation.play(0);
                    //t.camera.lookAt (t.s2[0].position);
                    //t.controls._camera.lookAt (t.s2[0].position);
                    //t.controls._camera.position = t.cameraOrigin;


                    t.renderer.domElement.addEventListener ("pointerdown", function (evt) {
                        /*const intersects = t.raycaster.intersectObjects (t.s2);
                        console.log ("pointerdown(): t.lookClock set to -1");
                        //t.lookClock = null;
                        t.lookClock = -1;
                        if (intersects[0] && intersects[0].object.type!=="Line") {
                            t.orbitControls.enabled = false;
                        t.controls.enabled= false;
                        t.flyControls.enabled = false;
                            console.log ("pointerdown()",t.orbitControls.enabled, t.controls.enabled, t.flyControls.enabled);
                            //t.camera.lookAt (t.s2[0].position);
                            //t.controls._camera.lookAt (t.s2[0].position);
                            //t.controls._camera.position = t.cameraOrigin;
                        } else {
                        t.controls.enabled= false;
                        t.flyControls.enabled = true;
                            t.orbitControls.enabled = true;
                            console.log ("pointerdown()",t.orbitControls.enabled, t.controls.enabled, t.flyControls.enabled);
                            //t.camera.lookAt (t.s2[0].position);
                            //t.controls._camera.lookAt (t.s2[0].position);
                            //t.controls._camera.position = t.cameraOrigin;
                        }* /
                    });
                    t.renderer.domElement.addEventListener ("pointermove", function (evt) {
                        var dbg = {
                            "t.controls._isDragging" : t.controls._isDragging,
                            "t.controls._dragNeedsUpdate" : t.controls._dragNeedsUpdate,
                            "t.lookClock" : t.lookClock
                        };
                        //if (t.debug) console.log (dbg);
                    });
                    t.renderer.domElement.addEventListener ("pointerup", function (evt) {
                        /*
                        if (t.debug) console.log ("pointerup() t.lookClock === -1, t.controls.enabled");
                        t.lookClock = -1;
                        t.controls.enabled = true;
                        t.orbitControls.enabled = true;
                        t.flyControls.enabled = false;
                        * /
                    });
                }



                if (false && !t.dragndrop) {
                    console.log ("Initializing drag and drop");
                    //var objs = [];
                    //for (var i=0; i<t.items.length; i++) if (t.items[i].model) objs[objs.length] = t.items[i].model;

                    t.dragndrop = new DragControls(
                        t.s2, t.camera, t.renderer.domElement
                    );
                    t.dragndrop.activate();
                    $(t.renderer.domElement).contextmenu(function() {
                        return false;
                    });

                    t.dragndrop.addEventListener( "dragstart", function ( event ) {
                        console.log ("dragstart() : init");;
                        t.controls.enabled = false;
                        t.flyControls.enabled = false;
                        t.flyControls.moveState.forward = 0;
                        t.flyControls.moveState.back = 0;
                        t.orbitControls.enabled = false;

                        t.dragndrop.cube = event.object;
                        t.dragndrop.mouseX = t.mouse.layerX;
                        t.dragndrop.mouseY = t.mouse.layerY;

                        let cube = event.object;

                        for (let i=0; i<t.items.length; i++) {
                            let it2 = t.items[i];
                            if (it2.idxPath === cube.it.idxPath) {
                                debugger;
                                it2.model.position.dragStartX = it2.model.position.x;
                                it2.model.position.dragStartY = it2.model.position.y;
                                it2.model.position.dragStartZ = it2.model.position.z;
                                /*it2.model2.position.dragStartX = it2.model2.position.x;
                                it2.model2.position.dragStartY = it2.model2.position.y;
                                it2.model2.position.dragStartZ = it2.model2.position.z;* /
                            }
                        }

                    } );

                    t.dragndrop.addEventListener( "drag", function (event) {
                        let cube = event.object;

                        //if (false)
                        for (let i=0; i<t.items.length; i++) {
                            let it2 = t.items[i];
                            if (it2.idxPath === cube.it.idxPath) {
                                debugger;
                                it2.model.position.x = it2.model.position.dragStartX + (t.dragndrop.mouseX - t.mouse.layerX) * 10;
                                it2.model.position.y = it2.model.position.dragStartY + (t.dragndrop.mouseY - t.mouse.layerY) * 10;
                                it2.model.position.z = it2.model.position.dragStartZ ;

                                /*
                                it2.model2.position.x = it2.model2.position.dragStartX - (t.dragndrop.mouseX - t.mouse.layerX);
                                it2.model2.position.y = it2.model2.position.dragStartY + (t.dragndrop.mouseY - t.mouse.layerY);
                                it2.model2.position.z = it2.model2.position.dragStartZ ;* /
                            }
                        }
                        /*
                        clearTimeout (t.posDataToDB);
                        t.posDataToDB = setTimeout(function() {
                            t.posDataToDatabase(t);
                        },
                        1000);
                        * /

                        if (t.showLines) {
                            for (var i=0; i<t.permaLines.length; i++) {
                                var l = t.permaLines[i];
                                t.scene.remove (l.line);
                                l.geometry.dispose();
                                l.material.dispose();
                            }
                            t.permaLines = [];
                            t.drawLines(t);
                        }
                    });

                    t.dragndrop.addEventListener( "dragend", function ( event ) {
                        if (t.showLines) t.drawLines(t);
                        t.lookClock = -2;
                        t.controls.enabled = true;
                        t.orbitControls.enabled = true;
                        t.flyControls.enabled = false;
                    } );

                };
            }, 50);*/
        };

        if (!t.started4) {
            t.started4 = true;
            t.onresize(t);
        };
        if (typeof callback=="function") callback(t);
    }



    toggleShowLines () {
        var t = this;
        t.showLines = !t.showLines;
        if (t.showLines) {
            t.drawLines(t);
            $("#showLines").removeClass("vividButton").addClass("vividButtonSelected");
        } else {
            for (var i=0; i<t.permaLines.length; i++) {
                var l = t.permaLines[i];
                t.scene.remove (l.line);
                l.geometry.dispose();
                l.material.dispose();
            }
            t.permaLines = [];
            $("#showLines").removeClass("vividButtonSelected").addClass("vividButton");
        }
    }

    drawLines (t) {
        //debugger;
        if (!t.showLines) return false;
        for (var i=0; i<t.permaLines.length; i++) {
            var l = t.permaLines[i];
            t.scene.remove(l.line);
            l.geometry.dispose();
            l.material.dispose();
        };
        t.lineColors = {};
        for (var i=1; i<t.items.length; i++) {
            var
            it = t.items[i];

//            debugger;
            if (it.parent) {
                var
                parent = it.parent,
                haveThisLineAlready = false;

                if (it.name.match(/\.mp3$/)) continue;
                if (!it.model) continue;

                for (var j=0; j<t.permaLines.length; j++) {
                    if (t.permaLines[j].it === it) {
                        haveThisLineAlready = true;
                        break;
                    }
                };

                for (var p1 in t.ld3) {
                    if (p1==it.idxPath) {
                        var p1s = p1.split("/");
                        var idx = p1s[p1s.length-2];
                        if (typeof idx=="number") var color = t.items[parseInt(idx)].color; else var color = null;
                    }
                }

                var
                p1 = it.model.position,
                p2 = (parent && parent.model ? parent.model.position : null);

                if (!p2) continue;

                //if (p1.x===0 && p1.y===0 && p1.z===0) continue;
                //if (p2.x===0 && p2.y===0 && p2.z===0) continue;

                const points = [];
                points.push( new THREE.Vector3( p1.x, p1.y, p1.z ) );
                points.push( new THREE.Vector3( p2.x, p2.y, p2.z ) );

                var
                geometry = new THREE.BufferGeometry().setFromPoints (points);
                if (!t.lineColors) t.lineColors = {};
                if (!t.lineColors[it.parent.idx] && color) {
                    t.lineColors[it.parent.idx] = color;
                } else {
                    var color = t.lineColors[it.parent.idx];
                }

                if (!color) color = "rgb(255,255,255)";

                var
                material = new THREE.LineBasicMaterial({ color: color, linewidth :1, opacity : 0.5, transparent : true }),
                line = new THREE.Line( geometry, material );
                t.scene.add(line);

                t.permaLines.push ({
                    line : line,
                    geometry : geometry,
                    material : material,
                    it : it
                });
            }
        }
        //$.cookie("3DFDM_lineColors", JSON.stringify(t.lineColors), na.m.cookieOptions());
    }

    useNewArrangement () {
        var t = this;
        t.onresize_do(t, t.posDataToDatabase);
    }

    useNewColors () {
        var t = this;
        for (var i=0; i<t.permaLines.length; i++) {
            t.scene.remove (t.permaLines[i].line);
            t.permaLines[i].geometry.dispose();
            t.permaLines[i].material.dispose();
        }
        t.permaLines = [];
        delete t.lineColors;
        setTimeout (function () {
            t.drawLines (t);
        }, 500);
    }

    
    OLD_initializeItems (t, items, data, parent, level, levelDepth, idxPath, filepath) {
        if (!t) t = this;
        //debugger;
        na.m.waitForCondition ('waiting for other initializeItems_do() commands to finish',
            function () {
                //debugger;
                return t.loading === false;
            },
            function () {
                //debugger;
                t.OLD_initializeItems_do (t, items, data, parent, level, levelDepth, idxPath, filepath);
            }, 100
        );
    }

    OLD_initializeItems_do (t, items, data, parent, level, levelDepth, idxPath, filepath) {
        if (data.model) { alert ('data.model!'); return false; };
        if (!t.ld2[level]) t.ld2[level] = { parent : parent, initItemsDoingIdx : 0, idxPath : idxPath };
        if (!t.ld2[level].keys) t.ld2[level].keys = Object.keys(data);
        if (t.ld2[level].initItemsDoingIdx >= t.ld2[level].keys.length) return false;
        
        if (!t.ld2[level].levelIdx) t.ld2[level].levelIdx = 0;
        
        if (!t.ld1[level]) t.ld1[level] = { levelIdx : 0 };
        
        if (!t.initCounter) t.initCounter=0;
        
        if (!t.ld3) t.ld3 = {};
        if (!t.ld3[idxPath]) t.ld3[idxPath] = { itemCount : 0, items : [] };
        t.ld3[idxPath].itemCount++;
         
        while (t.ld2[level].initItemsDoingIdx < t.ld2[level].keys.length) {
            var 
            keyIdx = t.ld2[level].initItemsDoingIdx,
            key = t.ld2[level].keys[ keyIdx ],
            itd = data[key];
            
            if (itd.files) t.initializeItems_do (t, items, itd.files, items.length-1, level+1, levelDepth+1, '0', itd.root); 
            else if (key!=='it' && key!=='thumbs')
            if (typeof itd == 'object' && itd!==null) {
                let 
                idxPath2 = !t.items[parent]||t.items[parent].idxPath===''?''+parent:t.items[parent].idxPath+','+parent,
                it = {
                    data : itd,
                    level : levelDepth,
                    name : key,
                    idx : items.length,
                    idxPath : idxPath2,
                    filepath : filepath,
                    levelIdx : t.ld2[level].levelIdx,
                    parent : parent
                };
                
                itd.it = it;
                
                items[items.length] = it;
                t.ld2[level].levelIdx++;

                if (!t.ld3[idxPath2]) t.ld3[idxPath2] = { itemCount : 0, items : [] };
                //t.ld3[path2].itemCount++;

                t.ld3[idxPath2].items.push (it.idx);
                
                
                let 
                cd = { //call data
                    t : t,
                    it : it,
                    items : items,
                    itd : itd,
                    parent : parent,
                    idxPath : idxPath2,
                    filepath : filepath,
                    levelDepth : levelDepth + 1
                };
                
                clearTimeout (t.onresizeInitTimeout);
                clearTimeout (t.linedrawTimeout);
                
                var 
                textures = [];
                for (var i=0; i<6; i++) textures[i] = '/NicerAppWebOS/siteMedia/folderIcon.png';
                for (var i=0; i<6; i++) {
                    var p = null;
                    if (itd[''+i] && itd[''+i].match(/.*\.png|.*\.jpeg|.*\.jpg|.*\.gif$/)) {
                        textures[i] = '/NicerAppWebOS/'+filepath+'/'+key+'/thumbs/'+itd[''+i];//fn;
                        textures[i] = textures[i].replace(/\/\//g, '/');
                    }
                }
                
                var
                materials = [
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[0])
                    }),
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[1])
                    }),
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[2])
                    }),
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[3])
                    }),
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[4])
                    }),
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(textures[5])
                    })
                ];
                var cube = new THREE.Mesh( new THREE.BoxGeometry( 30, 30, 30 ), materials );
                this.scene.add( cube );
                cube.it = it;
                it.model = cube;
                    console.log (items.length + ' - ' + it.name);
                
                    var
                    newLevel = (
                        Object.keys(t.ld2).length > 1
                        ? parseInt(Object.keys(t.ld2).reduce(function(a, b){ return t.ld2[a] > t.ld2[b] ? a : b }))+1
                        : 2
                    );
                    cd.level = newLevel;
                //setTimeout (function() {
                    //t.loading = false;
                    cd.t.initializeItems_do (cd.t, cd.items, cd.itd, cd.it.idx, newLevel, cd.levelDepth, cd.idxPath, filepath+'/'+key);
                //}, 50);
                
                /*
                t.loading = true;
                t.loader.load( '/NicerAppWebOS/3rd-party/3D/models/folder icon/scene.gltf', function ( gltf, cd) {
                    clearTimeout (t.onresizeInitTimeout);
                    
                    gltf.scene.scale.setScalar (10);
                    t.scene.add (gltf.scene);
                    cd.it.model = gltf.scene;
                    cd.it.model.it = cd.it;
                    cd.t.updateTextureEncoding(t, gltf.scene);
                    t.initCounter++;
                    
                    var
                    newLevel = (
                        Object.keys(t.ld2).length > 1
                        ? parseInt(Object.keys(t.ld2).reduce(function(a, b){ return t.ld2[a] > t.ld2[b] ? a : b }))+1
                        : 2
                    );
                    cd.level = newLevel;
                    
                    t.loading = false;                
                    cd.t.initializeItems (cd.t, cd.items, cd.itd, cd.it.idx, newLevel, cd.levelDepth, cd.path);
                    
                }, function ( xhr ) {
                    console.log( 'model "folder icon" : ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                }, function ( error ) {
                    console.error( error );
                },  cd );*/
            } 
            t.ld2[level].initItemsDoingIdx++;
            
            clearTimeout (t.onresizeInitTimeout);
            t.onresizeInitTimeout = setTimeout(function() {
                var objs = [];
                for (var i=0; i<t.items.length; i++) if (t.items[i].model) objs[objs.length] = t.items[i].model;
                                               
                t.controls = new OrbitControls( t.camera, t.renderer.domElement );
                t.controls.movementSpeed = 2000;
                t.controls.autoRotate = true;
                //$('#autoRotate').removeClass('vividButtonSelected').addClass('vividButton');
                //t.controls.listenToKeyEvents( window ); // optional
                t.controls.enabled = false;
                setTimeout (function(){
                     t.controls.enabled = true;
                }, 1000);
                                               
                t.dragndrop = new DragControls( objs, t.camera, t.renderer.domElement );
                
                $(t.renderer.domElement).contextmenu(function() {
                    return false;
                });
                
                t.dragndrop.addEventListener( 'dragstart', function ( event ) {
                    if (t.controls) t.controls.dispose();
                                             
                    t.dragndrop.cube = event.object;
                    t.dragndrop.mouseX = t.mouse.layerX;
                    t.dragndrop.mouseY = t.mouse.layerY;
                    
                    let cube = event.object;

                    for (let i=0; i<t.items.length; i++) {
                        let it2 = t.items[i];
                        if (it2.parent === cube.it.parent) {
                            //debugger;
                            it2.model.position.dragStartX = it2.model.position.x;
                            it2.model.position.dragStartY = it2.model.position.y;
                            it2.model.position.dragStartZ = it2.model.position.z;
                        }
                    }                    
                } );
                
                t.dragndrop.addEventListener( 'drag', function (event) {
                    let cube = event.object;

                    for (let i=0; i<t.items.length; i++) {
                        let it2 = t.items[i];
                        if (it2.parent === cube.it.parent) {
                            //debugger;
                            it2.model.position.x = it2.model.position.dragStartX - (t.dragndrop.mouseX - t.mouse.layerX);
                            it2.model.position.y = it2.model.position.dragStartY + (t.dragndrop.mouseY - t.mouse.layerY);
                            it2.model.position.z = cube.position.z;
                        }
                    }
                    clearTimeout (t.posDataToDB);
                    t.posDataToDB = setTimeout(function() {
                        t.posDataToDatabase(t);
                    }, 1000);
                    
                    if (t.showLines) {
                        for (var i=0; i<t.permaLines.length; i++) {
                            var l = t.permaLines[i];
                            t.scene.remove (l.line);
                            l.geometry.dispose();
                            l.material.dispose();
                        }
                        t.permaLines = [];
                        t.drawLines(t);
                    }
                });

                t.dragndrop.addEventListener( 'dragend', function ( event ) {
                    //event.object.material.emissive.set( 0x000000 );
                    t.controls = new OrbitControls( t.camera, t.renderer.domElement );
                    //this.controls.autoRotate = true;
                    $('#autoRotate').removeClass('vividButtonSelected').addClass('vividButton');
                    //t.controls.listenToKeyEvents( window ); // optional
                    t.controls.enabled = true;
                    
                    if (t.showLines) t.drawLines(t);
                } );
                
                /*t.databaseToPosData(t, function(loadedPosData) {
                    if (!loadedPosData) t.onresize (t); else if (t.showLines) t.drawLines(t);
                });*/
                t.onresize(t);
                
            }, 2000);
        }
    }
    
    OLD_onresize (t, levels) {
        if (!t) t = this;
        //debugger;
        na.m.waitForCondition ('waiting for other onresize commands to finish',
            function () { return t.resizing === false; },
            function () { t.onresize_do (t, levels); }, 
            200
        );
    }

    
    OLD_onresize_do(t, callback) {
        t.resizing = true;
        debugger;

        let 
        c = {};
        for (var path in t.ld3) {
            var ld3 = t.ld3[path];
            if (path!=='') {
                for (var i=0; i<ld3.items.length; i++) {
                    var
                    it = t.items[ld3.items[i]];
                    
                    ld3.rowColumnCount = Math.ceil(Math.sqrt(ld3.itemCount));
                    var
                    column = 0,
                    row = 1;

                    
                    if (it.filepath=='siteMedia/backgrounds/tiled/active') debugger;
                    for (var j=0; j<ld3.items.length; j++) {
                        var it2 = t.items[ld3.items[j]];
                        if (it2.levelIdx <= it.levelIdx) {
                            if (column >= ld3.rowColumnCount) {
                                row++;
                                column = 1;
                            } else column++;
                        } 
                    };
                    
                    it.row = row;
                    it.column = column;
                    if (it.filepath=='siteMedia/backgrounds/tiled/active') debugger;
                }
            }
        }
        
        var
        its = $.extend( [], t.items ),
        its2 = [],
        compare = function (a, b) { 
            return a.parent-b.parent;
        },
        compare1 = function (a, b) {
            if (a.it && b.it) {
                return a.it.level-b.it.level;
            } else return 0;
        };
        
        its.sort (compare);
        
        
        var 
        x = t.data, // x[a][b][c].it
        maxLevel = 0;

        for (var i=0; i<its.length; i++) {
            if (maxLevel < its[i].level) maxLevel = its[i].level;
            for (var j=0; j<its.length; j++) {
                if (its[i].parent === its[j].parent) {
                    var
                    ita = {
                        level : its[i].level,
                        maxColumn : Math.max( its[i].column, its[j].column ),
                        maxRow : Math.max( its[i].row, its[j].row )
                    };
                    if (ita.maxColumn === its[i].column) ita.maxColumnIt = its[i]; else ita.maxColumnIt = its[j];
                    if (ita.maxRow === its[i].row) ita.maxRowIt = its[i]; else ita.maxRowIt = its[j];
                    its[i].maxColumnIta = ita;
                    its[i].maxRowIta = ita;
                    its[j].maxColumnIta = ita;
                    its[j].maxRowIta = ita;
                    
                    its2.push (ita);
                }
            }
        }
        var
        compare2 = function (a,b) {
            var x = b.maxColumn - a.maxColumn;
            if (x === 0) return b.maxRow - a.maxRow; else return x;
        },
        its3 = its2.sort (compare2);
        
        
        for (var i=0; i<t.items.length; i++) {
            var
            offsetXY = 100,
            it = t.items[i],
            p = t.items[it.parent];
            
            if (p && p.parent && t.items[p.parent]) {
                var
                it2 = t.items[p.parent],
                ppLeftRight = it2.leftRight,
                ppUpDown = it2.upDown;                
            } else {
                var
                it2 = null,
                ppLeftRight = 1,
                ppUpDown = 1;
            };
            
            if (p) {
                
                var
                pmaxc = p.maxColumnIta.maxColumn,//p.level > 0 ? p.maxColumnIta.maxColumn : (p.maxColumnIta.maxColumn+1),
                pmaxr = p.maxRowIta.maxRow,
                pLeftRight = p.column > Math.floor(pmaxc / 2) ?  ppLeftRight * 1 : ppLeftRight * -1,
                pUpDown = p.row > Math.floor(p.maxRowIta.maxRow / 2) ? ppUpDown * 1 :  ppUpDown * -1,
                pModifierC = (
                    p.level > 1
                    ? pLeftRight
                    : it2 
                        ? p.model.position.x > it2.model.position.x ? 1 : -1
                        : 1
                ),
                pitcp = (
                      pModifierC * -1 * ((pmaxc / 2) - p.column)
                ),
                pitcPercentage = (pitcp*1.00) / pmaxc,
                pModifierR = (
                    p.level > 1
                    ? pUpDown
                    : it2 
                        ? p.model.position.y > it2.model.position.y ? 1 : -1
                        : 1
                ),
                pitrp = (
                      pModifierR * -1 * ((pmaxr / 2) - p.row)
                ),
                pitrPercentage = (pitrp*1.00) / pmaxr,
                pitc = offsetXY * pitcPercentage * p.maxColumnIta.maxColumn,
                pitr = offsetXY * pitrPercentage * p.maxRowIta.maxRow;
                
                it.pitcp = pitcp;
                it.pitrp = pitrp;
                it.parentColumOffset = pitc;
                it.parentRowOffset = pitr;
                it.parentColumOffsetPercentage = pitcPercentage;
                it.parentRowOffsetPercentage = pitrPercentage;
                it.parentLeftRight = pLeftRight;
                it.parentUpDown = pUpDown;
                
                var
                itmaxc = it.maxColumnIta.maxColumn,
                itmaxr = it.maxRowIta.maxRow,
                itLeftRight = it.column > Math.floor(itmaxc / 2) ? 1 : -1,
                itUpDown = it.row > Math.floor(itmaxr / 2) ? 1 : -1,
                itc = (
                    itLeftRight * ((itmaxc / 2) - it.column)
                ),
                itcPercentage = (itc*1.00) / itmaxc,
                itr = (
                    itUpDown * ((itmaxr / 2) - it.row)
                ),
                itrPercentage = (itr*1.00) / itmaxr,
                itco = 50 * itcPercentage * it.maxColumnIta.maxColumn,
                itro = 50 * itrPercentage * it.maxRowIta.maxRow;
                
                it.columnOffsetValue = itc;
                it.rowOffsetValue = itr;
                it.leftRight = itLeftRight;
                it.upDown = itUpDown;                
                
            } else { var mc = 0, mr = 0; };
        
            //if (p && p.name=='tiled') debugger;
            
            if (it.model && p && p.model) {
                it.model.position.x = Math.round(
                    p.model.position.x 
                    + pitc 
                    /*+ ic /*+ ((p.column-1)*100) */
                    + ( ( p.leftRight * (it.column-1) * 50))
                );
                it.model.position.y = Math.round(
                    p.model.position.y 
                    + pitr 
                    /*+ ir /*+ ((p.row-1)*100) */
                    + ( (p.upDown *  (it.row-1) * 50))
                );
                it.model.position.z = -1 * ((it.level+1) * 250 );
                
                var x = it.data.it;
                //if (p.name=='space stars night sky darkmode') debugger;
                //if (p.name=='sunrise sunset') debugger;
            }else if (it.model) {
                it.model.position.x = (it.column+1) * 50;
                it.model.position.y = (it.row-1) * 50;
                it.model.position.z = -1 * (it.level+1) * 250;
            }
                //if (p && (p.name=='tiled'||p.name=='iframe')) debugger;
                //if (p && (p.name=='landscape' || p.name=='scenery'||p.name=='animals')) debugger;
                //if (p && p.name=='space stars night sky darkmode') debugger;
        }
        
        t.drawLines(t);

        setTimeout(function() {
            t.onresize_do_overlapChecks2(t, callback);
            //if (typeof callback=='function') callback(t);
        }, 50);
    }
    

    OLD_onresize_do_overlapChecks2 (t, callback) {
        t.overlaps = [];
       
        for (var patha in t.ld3) {
            if (patha!=='') {
                var ld3a = t.ld3[patha];
                for (var pathb in t.ld3) {
                    if (pathb!=='' && pathb!==patha) {
                        var ld3b = t.ld3[pathb];
                        
                        for (var i=0; i<ld3a.items.length; i++) {
                            var ita = t.items[ld3a.items[i]];
                            
                            for (var j=0; j<ld3b.items.length; j++) {
                                var itb = t.items[ld3b.items[j]];
                                
                                if (
                                    ita.model && itb.model
                                    && ita.model.position.x === itb.model.position.x
                                    && ita.model.position.y === itb.model.position.y
                                    && ita.model.position.z === itb.model.position.z
                                ) {
                                    var have = false;
                                    for (var k=0; k<t.overlaps.length; k++) {
                                        if (
                                            (
                                                t.overlaps[k].patha === patha
                                                && t.overlaps[k].pathb === pathb
                                            )
                                            || (
                                                t.overlaps[k].patha === pathb
                                                && t.overlaps[k].pathb === patha
                                            )
                                        ) {
                                            have = true;
                                            break;
                                        }
                                            
                                    };
                                    if (!have) {
                                        t.overlaps.push ({overlappingItems_count : 0, patha : patha, pathb : pathb, conflicts : 1});
                                        var o = t.overlaps[t.overlaps.length-1];
                                    } else {
                                        var 
                                        o = t.overlaps[k];
                                        o.conflicts++;
                                    }
                                    t.overlaps[k].overlappingItems_count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        var 
        leastOverlappingItems = { overlappingItems_count : 200, j : -1 }, 
        mostOverlappingItems = { overlappingItems_count : 0, j : -1 }, 
        mostConflicts = {conflicts : 1, j : -1}, 
        largest = null, 
        smallest = null;
        
        for (var j=0; j<t.overlaps.length; j++) {
            if (t.overlaps[j].overlappingItems_count > mostOverlappingItems.overlappingItems_count)
                mostOverlappingItems = { overlappingItems_count : t.overlaps[j].overlappingItems_count, j : j};

            if (t.overlaps[j].overlappingItems_count < leastOverlappingItems.overlappingItems_count)
                leastOverlappingItems = { overlappingItems_count : t.overlaps[j].overlappingItems_count, j : j};
            
            if (t.overlaps[j].conflicts > mostConflicts.conflicts) mostConflicts = {conflicts:t.overlaps[j].conflicts, j : j};
            
            if (
                !largest 
                || (
                    t.ld3[t.overlaps[j].patha].itemCountA > largest.itemCountA 
                    && t.ld3[t.overlaps[j].pathb].itemCountB > largest.itemCountB
                )
            ) largest = { 
                pathb : t.overlaps[j].pathb, 
                itemCountA : t.ld3[t.overlaps[j].patha].itemCount, 
                itemCountB : t.ld3[t.overlaps[j].pathb].itemCount, 
                j : j 
            };
            
            if (
                !smallest 
                || (
                    t.ld3[t.overlaps[j].patha].itemCountA < smallest.itemCountA 
                    && t.ld3[t.overlaps[j].pathb].itemCountB < smallest.itemCountB
                )
            ) smallest = { 
                pathb : t.overlaps[j].pathb, 
                itemCountA : t.ld3[t.overlaps[j].patha].itemCount, 
                itemCountB : t.ld3[t.overlaps[j].pathb].itemCount, 
                j : j 
            };
                
        }
        
        // this for loop can be commented out for speed optimization, it's only here for debugging purposes
        for (var i=0; i<t.overlaps.length; i++) {
            var o = t.overlaps[i];
            o.itemsa = [];
            o.itemsb = [];
            for (var j=0; j<t.items.length; j++) {
                var it = t.items[j];
                if (it.path === o.patha) { o.itemsa.push(it); o.parenta = t.items[it.parent]; }
                if (it.path === o.pathb) { o.itemsb.push(it); o.parentb = t.items[it.parent]; }
            }
        };
        
        for (var j=0; j<t.items.length; j++) {
            t.items[j].adjustedModXmin = 0;
            t.items[j].adjustedModXadd = 0;
            t.items[j].adjustedModYmin = 0;
            t.items[j].adjustedModYadd = 0;
            t.items[j].assignments = [];
        };

        for (var i=0; i<t.overlaps.length; i++) {
            //if (i===mostConflicts.j) {
            if (i===largest.j) {
                var 
                x = mostOverlappingItems,
                overlapFixes = [ 'top', 'topright', 'middleright', 'bottomright', 'bottom', 'bottomleft', 'middleleft', 'topleft'],
                overlapFixData = [],
                overlapFix = null;
                
                for (var j=0; j<overlapFixes.length; j++) {
                    var 
                    ofs = overlapFixes[j], 
                    d = { quadrant : ofs };
                    
                    if (ofs.match('top')) d.upDown = 1; else if (ofs.match('bottom')) d.upDown = -1; else d.upDown = 0;
                    if (ofs.match('left')) d.leftRight = -1; else if (ofs.match('right')) d.leftRight = 1; else d.leftRight = 0;
                    
                    d.newPos = t.onresize_testCalculateOverlaps (t, t.overlaps[i].patha, t.overlaps[i].pathb, d);
                    overlapFixData.push (d);
                }
                
                overlapFix = t.onresize_calculateBestOverlapFix (t, overlapFixData);
                t.onresize_applyBestOverlapFix (t, overlapFix);
                //debugger;
            }
        }   
        if (t.overlaps.length > 0) {
            setTimeout (function() {
                t.onresize_do_overlapChecks2(t, callback);
            }, 10);
        } else if (typeof callback=='function') callback(t);        
    }
    
    onresize_applyBestOverlapFix (t, overlapFix) {
        var fix = overlapFix[0];
        for (var i=0; i<fix.itemsa.length; i++) {
            var ita = t.items[fix.itemsa[i].idx];
            if (ita.model) {
                ita.model.position.x = fix.itemsa[i].x;
                ita.model.position.y = fix.itemsa[i].y;
                ita.model.position.z = fix.itemsa[i].z;
            }
        }
    }
    
    OLD_onresize_calculateBestOverlapFix (t, overlapFixData) {
        var 
        compare = function (a,b) { return a.newPos.overlaps.length - b.newPos.overlaps.length; },
        x = overlapFixData.sort(compare);
        var
        compare2 = function (a,b) {
            if (
                a.newPos.overlaps[0] 
                && b.newPos.overlaps[0]
                && x[0].newPos.overlaps[0]
               // && a.newPos.overlaps[0].patha == x[0].newPos.overlaps[0].patha
              //  && b.newPos.overlaps[0].pathb == x[0].newPos.overlaps[0].pathb
            ) return a.newPos.overlaps[0].overlappingItems_count - b.newPos.overlaps[0].overlappingItems_count;
            else return 0;
        },
        y = x.sort(compare2);
        
        return y;
    }
    
    OLD_onresize_testCalculateOverlaps (t, patha, pathb, ofd4quadrant) {
        var r = {
            overlaps : []
        };
        ofd4quadrant.itemsa = [];
        ofd4quadrant.itemsb = [];
        
        
        var ld3a = t.ld3[patha];
        var ld3b = t.ld3[pathb];
        for (var i=0; i<ld3a.items.length; i++) {
            var ita = t.items[ld3a.items[i]];
            if (!ita.model) continue;
            ofd4quadrant.itemsa.push($.extend({},ita.model.position));
            var ita1 = ofd4quadrant.itemsa[ofd4quadrant.itemsa.length-1];
            ita1.idx = ita.idx;
            
            ita1.x += ofd4quadrant.leftRight * 50;
            ita1.y += ofd4quadrant.upDown * 50;

            for (var j=0; j<ld3b.items.length; j++) {
                var itb = t.items[ld3b.items[j]];
                if (!itb.model) continue;
                if (i===0) {
                    ofd4quadrant.itemsb.push($.extend({},itb.model.position));
                    var itb1 = ofd4quadrant.itemsb[ofd4quadrant.itemsb.length-1];
                    itb1.idx = itb.idx;
                } else {
                    var itb1 = null;
                    for (var k=0; k<ofd4quadrant.itemsb.length; k++) {
                        if (
                            itb.model.position.x === ofd4quadrant.itemsb[k].x
                            && itb.model.position.y === ofd4quadrant.itemsb[k].y
                            && itb.model.position.z === ofd4quadrant.itemsb[k].z
                        ) itb1 = ofd4quadrant.itemsb[k];
                    }
                }
                
                if (
                    ita1.x === itb1.x
                    && ita1.y === itb1.y
                    && ita1.z === itb1.z
                ) {
                    var have = false;
                    for (var k=0; k<r.overlaps.length; k++) {
                        if (
                            (
                                r.overlaps[k].patha === patha
                                && r.overlaps[k].pathb === pathb
                            )
                            || (
                                r.overlaps[k].patha === pathb
                                && r.overlaps[k].pathb === patha
                            )
                        ) {
                            have = true;
                            break;
                        }
                            
                    };
                    if (!have) {
                        r.overlaps.push ({overlappingItems_count : 0, patha : patha, pathb : pathb, conflicts : 1 });
                        var o = r.overlaps[t.overlaps.length-1];
                    } else {
                        var 
                        o = r.overlaps[k];
                        o.conflicts++;
                    }
                    r.overlaps[k].overlappingItems_count++;
                }
            }
        }
        
        r.leastOverlappingItems = { overlappingItems_count : 200, j : -1 }, 
        r.mostOverlappingItems = { overlappingItems_count : 0, j : -1 }, 
        r.mostConflicts = {conflicts : 1, j : -1};
        
        for (var j=0; j<r.overlaps.length; j++) {
            if (r.overlaps[j].overlappingItems_count > r.mostOverlappingItems.overlappingItems_count)
                r.mostOverlappingItems = { overlappingItems_count : r.overlaps[j].overlappingItems_count, j : j};

            if (r.overlaps[j].overlappingItems_count < r.leastOverlappingItems.overlappingItems_count)
                r.leastOverlappingItems = { overlappingItems_count : r.overlaps[j].overlappingItems_count, j : j};
            
            if (r.overlaps[j].conflicts > r.mostConflicts.conflicts) r.mostConflicts = {conflicts:r.overlaps[j].conflicts, j : j};
        }
        
        return r;
    }
    
    
    OLD_onresize_do_overlapChecks (t, callback) {
        t.overlaps = [];
        
        for (var patha in t.ld3) {
            if (patha!=='') {
                var ld3a = t.ld3[patha];
                for (var pathb in t.ld3) {
                    if (pathb!=='' && pathb!==patha) {
                        var ld3b = t.ld3[pathb];
                        
                        for (var i=0; i<ld3a.items.length; i++) {
                            var ita = t.items[ld3a.items[i]];
                            
                            for (var j=0; j<ld3b.items.length; j++) {
                                var itb = t.items[ld3b.items[j]];
                                
                                if (
                                    ita.model && itb.model
                                    && (
                                        ita.model.position.x === itb.model.position.x
                                        && ita.model.position.y === itb.model.position.y
                                        && ita.model.position.z === itb.model.position.z
                                    )
                                ) {
                                    var have = false;
                                    for (var k=0; k<t.overlaps.length; k++) {
                                        if (
                                            (
                                                t.overlaps[k].patha === patha
                                                && t.overlaps[k].pathb === pathb
                                            )
                                            || (
                                                t.overlaps[k].patha === pathb
                                                && t.overlaps[k].pathb === patha
                                            )
                                        ) {
                                            have = true;
                                            break;
                                        }
                                            
                                    };
                                    if (!have) {
                                        t.overlaps.push ({overlappingItems_count : 0, patha : patha, pathb : pathb, conflicts : 1, diffX : ita.model.position.x - itb.model.position.x, diffY : ita.model.position.y - itb.model.position.y, diffZ : ita.model.position.z - itb.model.position.z });
                                        var o = t.overlaps[t.overlaps.length-1];
                                        o.lastDiffX = o.diffX;
                                        o.lastDiffY = o.diffY;
                                        o.lastDiffZ = o.diffZ;
                                    } else {
                                        var 
                                        o = t.overlaps[k],
                                        diffX = ita.model.position.x - itb.model.position.x,
                                        diffY = ita.model.position.y - itb.model.position.y,
                                        diffZ = ita.model.position.z - itb.model.position.z;
                                        o.conflicts++;
                                        if (diffX > o.diffX) {o.lastDiffX = o.diffX; o.diffX = diffX;};
                                        if (diffY > o.diffY) {o.lastDiffY = o.diffY; o.diffY = diffY;};
                                        if (diffZ > o.diffZ) {o.lastDiffZ = o.diffZ; o.diffZ = diffZ;};
                                    }
                                    t.overlaps[k].overlappingItems_count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        var 
        leastOverlappingItems = { overlappingItems_count : 200, j : -1 }, 
        mostOverlappingItems = { overlappingItems_count : 0, j : -1 }, 
        mostConflicts = {conflicts : 1, j : -1}, 
        largest = null, 
        smallest = null;
        
        for (var j=0; j<t.overlaps.length; j++) {
            if (t.overlaps[j].overlappingItems_count > mostOverlappingItems.overlappingItems_count)
                mostOverlappingItems = { overlappingItems_count : t.overlaps[j].overlappingItems_count, j : j};

            if (t.overlaps[j].overlappingItems_count < leastOverlappingItems.overlappingItems_count)
                leastOverlappingItems = { overlappingItems_count : t.overlaps[j].overlappingItems_count, j : j};
            
            if (t.overlaps[j].conflicts > mostConflicts.conflicts) mostConflicts = {conflicts:t.overlaps[j].conflicts, j : j};
            
            if (
                !largest 
                || (
                    t.ld3[t.overlaps[j].patha].itemCountA > largest.itemCountA 
                    && t.ld3[t.overlaps[j].pathb].itemCountB > largest.itemCountB
                )
            ) largest = { 
                pathb : t.overlaps[j].pathb, 
                itemCountA : t.ld3[t.overlaps[j].patha].itemCount, 
                itemCountB : t.ld3[t.overlaps[j].pathb].itemCount, 
                j : j 
            };
            
            if (
                !smallest 
                || (
                    t.ld3[t.overlaps[j].patha].itemCountA < smallest.itemCountA 
                    && t.ld3[t.overlaps[j].pathb].itemCountB < smallest.itemCountB
                )
            ) smallest = { 
                pathb : t.overlaps[j].pathb, 
                itemCountA : t.ld3[t.overlaps[j].patha].itemCount, 
                itemCountB : t.ld3[t.overlaps[j].pathb].itemCount, 
                j : j 
            };
                
        }
        
        // this for loop can be commented out for speed optimization, it's only here for debugging purposes
        for (var i=0; i<t.overlaps.length; i++) {
            var o = t.overlaps[i];
            o.itemsa = [];
            o.itemsb = [];
            for (var j=0; j<t.items.length; j++) {
                var it = t.items[j];
                if (it.path === o.patha) { o.itemsa.push(it); o.parenta = t.items[it.parent]; }
                if (it.path === o.pathb) { o.itemsb.push(it); o.parentb = t.items[it.parent]; }
            }
        };

        for (var j=0; j<t.items.length; j++) {
            t.items[j].adjustedModXmin = 0;
            t.items[j].adjustedModXadd = 0;
            t.items[j].adjustedModYmin = 0;
            t.items[j].adjustedModYadd = 0;
            t.items[j].assignments = [];
        };

        
        for (var i=0; i<t.overlaps.length; i++) {
            //if (i===mostConflicts.j) {
            if (i===largest.j) {
                var 
                o = t.overlaps[i],
                oa = t.ld3[o.patha],
                ob = t.ld3[o.pathb],
                ox = Math.random() < 0.5 ? oa : ob,
                p1 = parseInt(o.patha.substr(o.patha.lastIndexOf(',')+1)),
                p1it = t.items[p1],
                p1a = o.patha.replace(','+p1,''),
                commonParent = parseInt(p1a.substr(p1a.lastIndexOf(',')+1)),
                commonParentIt = t.items[commonParent],
                p2 = parseInt(o.pathb.substr(o.pathb.lastIndexOf(',')+1)),
                p2it = t.items[p2];
                
                if (p1it.column < p2it.column) ox.modifierColumn = -1; else ox.modifierColumn = 1;
                if (p1it.row < p2it.row) ox.modifierRow = -1; else ox.modifierRow = 1;

                /*if (!p1it.assignments) p1it.assignments = [];
                if (!p2it.assignments) p2it.assignments = [];*/
                
                commonParentIt.assignmentColumnMin = 0;
                commonParentIt.assignmentColumnAdd = 0;
                commonParentIt.assignmentRowMin = 0;
                commonParentIt.assignmentRowAdd = 0;
                for (var j=0; j<commonParentIt.assignments.length; j++) {
                    if (commonParentIt.assignments[j].modifierColumn===-1) {
                        commonParentIt.assignmentColumnMin++;
                    } else {
                        commonParentIt.assignmentColumnAdd++;
                    }
                    if (commonParentIt.assignments[j].modifierRow===-1) {
                        commonParentIt.assignmentRowMin++;
                    } else {
                        commonParentIt.assignmentRowAdd++;
                    }
                }
                /*
                p1it.assignmentColumnMin = 0;
                p1it.assignmentColumnAdd = 0;
                p1it.assignmentRowMin = 0;
                p1it.assignmentRowAdd = 0;
                for (var j=0; j<p1it.assignments.length; j++) {
                    if (p1it.assignments[j].modifierColumn===-1) {
                        p1it.assignmentColumnMin++;
                    } else {
                        p1it.assignmentColumnAdd++;
                    }
                    if (p1it.assignments[j].modifierRow===-1) {
                        p1it.assignmentRowMin++;
                    } else {
                        p1it.assignmentRowAdd++;
                    }
                }
                p2it.assignmentColumnMin = 0;
                p2it.assignmentColumnAdd = 0;
                p2it.assignmentRowMin = 0;
                p2it.assignmentRowAdd = 0;
                for (var j=0; j<p2it.assignments.length; j++) {
                    if (p2it.assignments[j].modifierColumn===-1) {
                        p2it.assignmentColumnMin++;
                    } else {
                        p2it.assignmentColumnAdd++;
                    }
                    if (p2it.assignments[j].modifierRow===-1) {
                        p2it.assignmentRowMin++;
                    } else {
                        p2it.assignmentRowAdd++;
                    }
                }*/
                
            //debugger;
            /*
                if (commonParentIt.assignmentColumnMin > 0 || commonParentIt.assignmentColumnAdd > 0) {
                    ox.modifierColumn = commonParentIt.assignmentColumnMin < commonParentIt.assignmentColumnAdd ? 1 : -1;
                }
                if (commonParentIt.assignmentRowMin > 0 || commonParentIt.assignmentRowAdd > 0) {
                    ox.modifierRow = commonParentIt.assignmentRowMin < commonParentIt.assignmentRowAdd ? 1 : -1;
                }
                
                //if (Math.random() < 0.5) ob.modifierColumn = Math.random() < 0.5 ? -1 : 1;
                //if (Math.random() < 0.5) ob.modifierRow = Math.random() < 0.5 ? -1 : 1;
                /*
                if (Math.random() < 0.75) {
                    //ox.modifierColumn = p1it.column < p2it.column ? p1it.modifierColumn : p2it.modifierColumn;
                    //ox.modifierRow = p1it.row < p2it.row ? p1it.modifiedRow : p2it.modifierRow;
                    ox.modifierColumn = Math.random() < 0.5 ? -1 : 1;
                    ox.modifierRow = Math.random() < 0.5 ? -1 : 1;
                }*/
                
                
                var dat = {
                    modifierColumn : ox.modifierColumn,
                    modifierRow : ox.modifierRow
                };
                commonParentIt.assignments.push (dat);
                commonParentIt.assignments.push (dat);
                
                p1it.randomXoffset = /*ox.modifierColumn */commonParentIt.modifierColumn * (commonParentIt.modifierColumn===-1?commonParentIt.assignmentColumnMin:commonParentIt.assignmentColumnAdd) * Math.random() * 100;
                p1it.randomYoffset = /*ox.modifierRow */commonParentIt.modifierRow * (commonParentIt.modifierRow===-1?commonParentIt.assignmentRowMin:commonParentIt.assignmentRowAdd) *  Math.random() * 100;
                                
                for (var j=0; j<oa.items.length; j++) {
                    var it = t.items[ oa.items[j] ];
                    
                    
                    
                    if (it.model) {
                        it.model.position.x += (commonParentIt.model?commonParentIt.model.position.x:0) + (200 * ox.modifierColumn * (ox.modifierColumn===-1?it.adjustedModXmin:it.adjustedModXadd)) + it.modifierColumn * 50;
                        /*it.model.position.x = 
                            (p1it.model?p1it.model.position.x:0) 
                            + (200 * ox.modifierColumn * (ox.modifierColumn===-1?it.adjustedModXmin:it.adjustedModXadd)) 
                            + (ox.modifierColumn * it.column * 50)
                            + p1it.randomXoffset;*/
                        it.model.position.y += (commonParentIt.model?commonParentIt.model.position.y:0) + (200 * ox.modifierRow * (ox.modifierRow===-1?it.adjustedModYmin:it.adjustedModYadd)) + it.modifierRow * 50;
                        /*it.model.position.y = 
                            (p1it.model?p1it.model.position.y:0) 
                            + (200 * ox.modifierRow * (ox.modifierRow===-1?it.adjustedModYmin:it.adjustedModYadd)) 
                            + (ox.modifierRow * it.row * 50)
                            + p1it.randomYoffset;*/
                        //debugger;
                        
                        if (ox.modifiedColumn===1) {
                            it.adjustedModXadd++;
                        } else {
                            it.adjustedModXmin++;
                        }
                        if (ox.modifiedRow===1) {
                            it.adjustedModYmax++;
                        } else {
                            it.adjustedModYmin++;
                        }
                    }
                    for (var k=0; k<t.items.length; k++) {
                        var 
                        it2 = t.items[k],
                        p = t.items[it2.parent],
                        oap = t.items[oa.parent];

                        if (
                            it2.model 
                            && (
                                it2.path!==o.pathb 
                                && it2.path.substr(0,o.pathb.length)==o.pathb
                                && (it2.path.replace(o.pathb+',','').match(/,/g) || []).length === 0
                            )
                        ) {
                            it2.model.position.x = p.model.position.x + (100  * ox.modifierColumn) + p.modifierColumn * (it2.column-1) * 50;
                            it2.model.position.y = p.model.position.y + (100  * ox.modifierRow) + p.modifierRow * (it2.row-1) * 50;
                            it2.adjusted++;
                        }
                    }
                }
                debugger;
            }
        }
        
        if (t.overlaps.length > 0) {
            setTimeout (function() {
                t.onresize_do_overlapChecks(t, callback);
            }, 10);
        } else if (typeof callback=='function') callback(t);
    }
 
    posDataToDatabase (t) {
        let address = function (databaseName, username, password) {
            var r = 
                na.site.globals.couchdb.http
                +(typeof username=='string' && username!=='' ? username : na.a.settings.username)+':'
                +(typeof password=='string' && password!=='' ? password : na.a.settings.password)+'@'
                +na.site.globals.couchdb.domain
                +':'+na.site.globals.couchdb.port
                +'/'+na.site.globals.domain+'___'+databaseName;
            return r;
        },
        s = t.settings,
        un = na.a.settings.username,
        unl = un.toLowerCase(),
        pw = na.a.settings.password,
        dbName = 'three_d_positions',
        myip = na.site.globals.myip.replace(/_/g,'.');
        
        if (!s.pouchdb[dbName]) s.pouchdb[dbName] = new PouchDB(address(dbName,un,pw));
        
        let
        doc = {
            _id : 'positions_'+un,
            positions : [{ x : 0, y : 0, z : 0 }],
            lineColors : {}
        };
        
        for (let i=0; i<t.items.length; i++) {
            if (t.items[i].model) doc.positions[i] = {
                x : t.items[i].model.position.x,
                y : t.items[i].model.position.y,
                z : t.items[i].model.position.z
            }
        };
        for (var parent in t.lineColors) {
            doc.lineColors[parent] = t.lineColors[parent];
        }
        
        s.pouchdb[dbName].get(doc._id).then(function(docStored){
            doc._rev = docStored._rev;
            return s.pouchdb[dbName].put(doc);
        }).catch(function(err){
            return s.pouchdb[dbName].put(doc);
        });
    }
    
    databaseToPosData (t, callback) {
        let address = function (databaseName, username, password) {
            var r = 
                na.site.globals.couchdb.http
                +(typeof username=='string' && username!=='' ? username : na.a.settings.username)+':'
                +(typeof password=='string' && password!=='' ? password : na.a.settings.password)+'@'
                +na.site.globals.couchdb.domain
                +':'+na.site.globals.couchdb.port
                +'/'+na.site.globals.domain+'___'+databaseName;
            return r;
        },
        s = t.settings,
        un = na.a.settings.username,
        unl = un.toLowerCase(),
        pw = na.a.settings.password,
        dbName = 'three_d_positions',
        myip = na.site.globals.myip.replace(/_/g,'.');
        
        if (!s.pouchdb[dbName]) s.pouchdb[dbName] = new PouchDB(address(dbName,un,pw));
        s.pouchdb[dbName].get('positions_'+un).then(function(doc){
            for (let i=0; i<doc.positions.length; i++) {
                if (t.items[i].model) {
                    t.items[i].model.position.x = doc.positions[i].x;
                    t.items[i].model.position.y = doc.positions[i].y;
                    t.items[i].model.position.z = doc.positions[i].z;
                }
            }
            for (var parent in doc.lineColors) {
                t.lineColors[parent] = doc.lineColors[parent];
            };
            
            callback(true);
        }).catch(function(err){
            callback(false);
        });
    }
    
    OLD_toggleShowLines () {
        var t = this;
        t.showLines = !t.showLines;
        if (t.showLines) {
            t.drawLines(t);
            $('#showLines').removeClass('vividButton').addClass('vividButtonSelected');
        } else {
            for (var i=0; i<t.permaLines.length; i++) {
                var l = t.permaLines[i];
                t.scene.remove (l.line);
                l.geometry.dispose();
                l.material.dispose();
            }
            t.permaLines = [];
            $('#showLines').removeClass('vividButtonSelected').addClass('vividButton');
        }
    }
    
    OLD_drawLines (t) {
        //debugger;
        for (var i=0; i<t.permaLines.length; i++) {
            var l = t.permaLines[i];
            t.scene.remove(l.line);
            l.geometry.dispose();
            l.material.dispose();
        };
        
        for (var i=1; i<t.items.length; i++) {
            var 
            it = t.items[i],
            parent = t.items[it.parent],
            haveThisLineAlready = false;
            
            if (!this.showLines) return false;
            if (!it.model) return false;
            
            if (it.parent===0 || typeof it.parent === 'undefined') continue;
            
            for (var j=0; j<t.permaLines.length; j++) {
                if (t.permaLines[j].it === it) {
                    haveThisLineAlready = true;
                    break;
                }
            };
            
            if (parent && parent.model) {
                var 
                geometry = new THREE.Geometry(), 
                p1 = it.model.position, 
                p2 = parent.model.position;
                if (p1.x===0 && p1.y===0 && p1.z===0) continue;
                if (p2.x===0 && p2.y===0 && p2.z===0) continue;
                
                geometry.dynamic = true;
                geometry.vertices.push(p1);
                geometry.vertices.push(p2);
                geometry.verticesNeedUpdate = true;
                
                if (!t.lineColors) t.lineColors = {};
                if (!t.lineColors[it.parent]) {
                    var x=Math.round(0xffffff * Math.random()).toString(16);
                    var y=(6-x.length);
                    var z="000000";
                    var z1 = z.substring(0,y);
                    var color= z1 + x;                    
                    t.lineColors[it.parent] = color;
                }
                var color = t.lineColors[it.parent];
                
                var
                material = new THREE.LineBasicMaterial({ color: '#'+color, linewidth :2 }),
                line = new THREE.Line( geometry, material );
                t.scene.add(line);

                t.permaLines[t.permaLines.length] = {
                    line : line,
                    geometry : geometry,
                    material : material,
                    it : it
                };
            }
        }
        $.cookie('3DFDM_lineColors', JSON.stringify(t.lineColors), na.m.cookieOptions());
    }
    
    OLD_useNewArrangement () {
        var t = this;
        t.onresize_do(t, t.posDataToDatabase);
    }
    
    OLD_useNewColors () {
        var t = this;
        for (var i=0; i<t.permaLines.length; i++) {
            t.scene.remove (t.permaLines[i].line);
            t.permaLines[i].geometry.dispose();
            t.permaLines[i].material.dispose();
        }
        t.permaLines = [];
        delete t.lineColors;
        setTimeout (function () {
            t.drawLines (t);
        }, 500);
    }
    
    toggleAutoRotate () {
        var t = this;
        t.controls.autoRotate = !t.controls.autoRotate;
        if (t.controls.autoRotate) $('#autoRotate').removeClass('vividButton').addClass('vividButtonSelected'); 
        else $('#autoRotate').removeClass('vividButtonSelected').addClass('vividButton');
    }
    
    updateTextureEncoding (t, content) {
        /*const encoding = this.state.textureEncoding === 'sRGB'
        ? sRGBEncoding
        : LinearEncoding;*/
        const encoding = LinearEncoding;
        t.traverseMaterials(content, (material) => {
            if (material.map) material.map.encoding = encoding;
            if (material.emissiveMap) material.emissiveMap.encoding = encoding;
            if (material.map || material.emissiveMap) material.needsUpdate = true;
        });
    }
    
    traverseMaterials (object, callback) {
        object.traverse((node) => {
            if (!node.isMesh) return;
            const materials = Array.isArray(node.material)
                ? node.material
                : [node.material];
            materials.forEach(callback);
        });
    }
    
    updateEnvironment (t) {
        /*
        const environment = {
            id: 'venice-sunset',
            name: 'Venice Sunset',
            path: '/NicerAppWebOS/3rd-party/3D/assets/environment/venice_sunset_1k.hdr',
            format: '.hdr'
        };*/
        const environment = {
            id: 'footprint-court',
            name: 'Footprint Court (HDR Labs)',
            path: '/NicerAppWebOS/3rd-party/3D/assets/environment/footprint_court_2k.hdr',
            format: '.hdr'
        }

        t.getCubeMapTexture( environment ).then(( { envMap } ) => {

            /*if ((!envMap || !this.state.background) && this.activeCamera === this.defaultCamera) {
                t.scene.add(this.vignette);
            } else {
                t.scene.remove(this.vignette);
            }*/

            t.scene.environment = envMap;
            //this.scene.background = this.state.background ? envMap : null;

        });

    }    
    
    getCubeMapTexture ( environment ) {
        const { path } = environment;

        // no envmap
        if ( ! path ) return Promise.resolve( { envMap: null } );

        return new Promise( ( resolve, reject ) => {
            new RGBELoader()
                .setDataType( UnsignedByteType )
                .load( path, ( texture ) => {

                    const envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;
                    this.pmremGenerator.dispose();

                    resolve( { envMap } );

                }, undefined, reject );
        });
    }
}






export class na3D_fileBrowser_extensionApp_crimeboard {
    constructor(el, parent, data) {
        var t = this;
	}
}






export class na3D_demo_models {
    constructor(el, parent, data) {
        var t = this;
        this.p = parent;
        this.el = el;
        this.t = $(this.el).attr('theme');
        
        this.data = data;
        
        this.lights = [];
        this.folders = [];
   
        this.items = [];
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, $(el).width() / $(el).height(), 0.1, 1000 );
        

        this.renderer = new THREE.WebGLRenderer({alpha:true, antialias : true});
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.setPixelRatio (window.devicePixelRatio);
        this.renderer.setSize( $(el).width()-20, $(el).height()-20 );
        
        this.renderer.toneMappingExposure = 1.0;
        
        el.appendChild( this.renderer.domElement );
        
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        //this.controls.listenToKeyEvents( window ); // optional
        
        this.loader = new GLTFLoader();
        
        this.loader.load( '/NicerAppWebOS/3rd-party/3D/models/human armor/scene.gltf', function ( gltf ) {
            gltf.scene.position.x = -150;
            gltf.scene.scale.setScalar (10);
            t.cube = gltf.scene;
            t.scene.add (t.cube);
            
            t.updateTextureEncoding(t, t.cube);
        }, function ( xhr ) {
            console.log( 'model "human armor" : ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }, function ( error ) {
            console.error( error );
        } );
        this.loader.load( '/NicerAppWebOS/3rd-party/3D/models/photoCamera/scene.gltf', function ( gltf ) {
            gltf.scene.position.x = 200;
            t.cube2 = gltf.scene;
            t.scene.add (t.cube2);
            
            t.updateTextureEncoding(t, t.cube2);
            
        }, function ( xhr ) {
            console.log( 'model "photoCamera" : ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }, function ( error ) {
            console.error( error );
        } );
        
        const light1  = new AmbientLight(0xFFFFFF, 0.3);
        light1.name = 'ambient_light';
        light1.intensity = 0.3;
        light1.color = 0xFFFFFF;
        this.camera.add( light1 );

        const light2  = new DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
        light2.position.set(0.5, 0, 0.866); // ~60º
        light2.name = 'main_light';
        light2.intensity = 0.8 * Math.PI;
        light2.color = 0xFFFFFF;
        this.camera.add( light2 );

        this.lights.push(light1, light2);        
        
        this.pmremGenerator = new PMREMGenerator( this.renderer );
        this.pmremGenerator.compileEquirectangularShader();
        
        this.updateEnvironment(this);
        
        $(el).bind('mousemove', function() { t.onMouseMove (event, t) });
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mouse.x = 0;
        this.mouse.y = 0;

        this.camera.position.z = 700;
        
        this.animate(this);
    }
    
    animate(t) {
        requestAnimationFrame( function() { t.animate (t) } );
        
        t.raycaster.setFromCamera (t.mouse, t.camera);
        
        const intersects = t.raycaster.intersectObjects (t.scene.children, true);
        if (intersects[0] && t.cube && t.cube2) {
            t.cube.rotation.x += 0.015;
            t.cube.rotation.y += 0.02;
            t.cube2.rotation.x += 0.015;
            t.cube2.rotation.y += 0.02;
            //t.cube2.rotation.y += 0.02;
        }
        
        t.renderer.render( t.scene, t.camera );
    }
    
    
    updateTextureEncoding (t, content) {
        /*const encoding = this.state.textureEncoding === 'sRGB'
        ? sRGBEncoding
        : LinearEncoding;*/
        const encoding = sRGBEncoding;
        t.traverseMaterials(content, (material) => {
            if (material.map) material.map.encoding = encoding;
            if (material.emissiveMap) material.emissiveMap.encoding = encoding;
            if (material.map || material.emissiveMap) material.needsUpdate = true;
        });
    }
    
    traverseMaterials (object, callback) {
        object.traverse((node) => {
            if (!node.isMesh) return;
            const materials = Array.isArray(node.material)
                ? node.material
                : [node.material];
            materials.forEach(callback);
        });
    }
    
    updateEnvironment (t) {
        /*
        const environment = {
            id: 'venice-sunset',
            name: 'Venice Sunset',
            path: '/NicerAppWebOS/3rd-party/3D/assets/environment/venice_sunset_1k.hdr',
            format: '.hdr'
        };*/
        const environment = {
            id: 'footprint-court',
            name: 'Footprint Court (HDR Labs)',
            path: '/NicerAppWebOS/3rd-party/3D/assets/environment/footprint_court_2k.hdr',
            format: '.hdr'
        }

        t.getCubeMapTexture( environment ).then(( { envMap } ) => {

            /*
            if (!envMap || !this.state.background) && this.activeCamera === this.defaultCamera) {
                t.scene.add(this.vignette);
            } else {
                t.scene.remove(this.vignette);
            }*/
            t.scene.add(this.vignette);

            t.scene.environment = envMap;
            //this.scene.background = envMap;//this.state.background ? envMap : null;

        });

    }    
    
    getCubeMapTexture ( environment ) {
        const { path } = environment;

        // no envmap
        if ( ! path ) return Promise.resolve( { envMap: null } );

        return new Promise( ( resolve, reject ) => {
            new RGBELoader()
                .setDataType( UnsignedByteType )
                .load( path, ( texture ) => {

                    const envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;
                    this.pmremGenerator.dispose();

                    resolve( { envMap } );

                }, undefined, reject );
        });
    }

    
    onMouseMove( event, t ) {
        var rect = t.renderer.domElement.getBoundingClientRect();
        t.mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
        t.mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;        
    }
    
    onMouseWheel( event, t ) {
        debugger;
    }
}







export class na3D_demo_cube {
    constructor(el,parent) {
        this.p = parent;
        this.el = el;
        this.t = $(this.el).attr('theme');
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, $(el).width() / $(el).height(), 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({ alpha : true });
        this.renderer.setSize( $(el).width()-20, $(el).height()-20 );
        el.appendChild( this.renderer.domElement );
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var materials = [
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/blue/4a065201509c0fc50e7341ce04cf7902--twitter-backgrounds-blue-backgrounds.jpg')
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/blue/6250247-Blue-stone-seamless-texture-Stock-Photo.jpg')
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/blue/abstract-seamless-crumpled-tissue-textures-2.png')
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/green/363806708_7d577861f7.jpg')
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/green/dgren051.jpg')
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/NicerAppWebOS/siteMedia/backgrounds/tiled/active/green/leaves007.jpg')
            })
        ];
        this.cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
        this.scene.add( this.cube );
        var t = this;
        $(el).bind('mousemove', function() { t.onMouseMove (event, t) });
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.camera.position.z = 5;
        this.cube.rotation.x = 0.3;
        this.cube.rotation.y = 0.4;
        this.animate(this);
    }
    
    onMouseMove( event, t ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        //t.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        //t.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var rect = t.renderer.domElement.getBoundingClientRect();
        t.mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
        t.mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;        
    }
    
    
    animate(t) {
        requestAnimationFrame( function() { t.animate (t) } );
        //t.cube.rotation.x += 0.02;
        //t.cube.rotation.y += 0.02;
        t.raycaster.setFromCamera (t.mouse, t.camera);
        const intersects = t.raycaster.intersectObjects (t.scene.children, true);
        for (var i=0; i<intersects.length; i++) {
            intersects[i].object.rotation.x += 0.02;
            intersects[i].object.rotation.y += 0.02;
        }
        t.renderer.render( t.scene, t.camera );
    }
}
