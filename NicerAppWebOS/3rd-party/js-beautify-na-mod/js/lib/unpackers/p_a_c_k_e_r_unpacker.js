//
// Unpacker for Dean Edward's p.a.c.k.e.r, a part of javascript beautifier
// written by Einar Lielmanis <einar@jsbeautifier.org>
//
// Coincidentally, it can defeat a couple of other eval-based compressors.
//
// usage:
//
// if (P_A_C_K_E_R.detect(some_string)) {
//     var unpacked = P_A_C_K_E_R.unpack(some_string);
// }
// 
//

var P_A_C_K_E_R = {
    detect: function (str) {
        return (P_A_C_K_E_R.get_chunks(str).length > 0);
    },

    get_chunks: function(str) {
        var chunks = str.match(/eval\(\(?function\(.*?,0,\{\}\)\)/g);
        return chunks ? chunks : [];
    },

    unpack: function (str) {
        var chunks = P_A_C_K_E_R.get_chunks(str);
        for(var i = 0; i < chunks.length; i++) {
            str = str.split(chunks[i]).join( P_A_C_K_E_R.unpack_chunk(chunks[i]) );
        }
        return str;
    },

    unpack_chunk: function (str) {
        var unpacked_source = '';
        if (P_A_C_K_E_R.detect(str)) {
            try {
                eval('unpacked_source = ' + str.substring(4) + ';');
                if (typeof unpacked_source == 'string' && unpacked_source) {
                    str = unpacked_source;
                }
            } catch (error) {
                // well, it failed. we'll just return the original, instead of crashing on user.
            }
        }
        return str;
    },

    run_tests: function (sanity_test) {
        var t = sanity_test || new SanityTest(),
            pk1 = "eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0 2=1',3,3,'var||a'.split('|'),0,{}))",
            unpk1 = 'var a=1',
            pk2 = "eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0 2=1',3,3,'foo||b'.split('|'),0,{}))",
            unpk2 = 'foo b=1',
            pk_broken =  "eval(function(p,a,c,k,e,r){BORKBORK;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('0 2=1',3,3,'var||a'.split('|'),0,{}))";
        t.test_function(P_A_C_K_E_R.detect, "P_A_C_K_E_R.detect");
        t.expect('', false);
        t.expect('var a = b', false);
        t.test_function(P_A_C_K_E_R.unpack, "P_A_C_K_E_R.unpack");
        t.expect(pk_broken, pk_broken);
        t.expect(pk1, unpk1);
        t.expect(pk2, unpk2);

        var filler = '\nfiller\n';
        t.expect(filler + pk1 + pk_broken + filler + pk2 + filler, filler + unpk1 + pk_broken + filler + unpk2 + filler);

        return t;
    }


};
