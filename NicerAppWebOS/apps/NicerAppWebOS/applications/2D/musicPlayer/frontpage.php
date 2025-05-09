<?php
    /*
    $views = array(
        'music_index__DJ_Firesnake' => array (
            '/NicerAppWebOS/apps/nicer.app/applications/2D/musicPlayer' => array (
                'set' => 'DJ_FireSnake',
                'seoValue' => 'music-2015-DJ_FireSnake'
            )
        ),
        'music_index__Deep_House' => array (
            '/NicerAppWebOS/apps/nicer.app/applications/2D/musicPlayer' => array (
                'set' => 'Deep_House',
                'seoValue' => 'music-2021-Deep_House'
            )
        ),
        'music_index__Beautiful_Chill_Mixes' => array (
            '/NicerAppWebOS/apps/nicer.app/applications/2D/musicPlayer' => array (
                'set' => 'Beautiful_Chill_Mixes',
                'seoValue' => 'music-Beautiful_Chill_Mixes'
            )
        ),
        'music_index__Black_Horse__Mongolian_Traditional_Classical_Music_Art' => array (
            '/NicerAppWebOS/apps/nicer.app/applications/2D/musicPlayer' => array (
                'set' => 'Black_Horse__Mongolian_Traditional_Classical_Music_Art',
                'seoValue' => 'music-Black_Horse-Mongolian-Traditional-Classical-Music-Art'
            )
        )
    );
    $json = array();
    $urls = array();
    foreach ($views as $viewName => $viewSettings) {
        $json[$viewName] = json_encode($viewSettings);
        $urls[$viewName] = '/apps/'.base64_encode_url($json[$viewName]);
    };
    */
    $rootPath_vkdmd = realpath(dirname(__FILE__).'/../../../../../..');
    require_once ($rootPath_vkdmd.'/NicerAppWebOS/boot.php');
    require_once ($rootPath_vkdmd.'/NicerAppWebOS/domainConfigs/'.$naWebOS->domainFolder.'/mainmenu.items.php');
    global $naURLs;
    //var_dump ($naURLs);
?>
    <link href="https://fonts.googleapis.com/css?family=Krona+One&display=swap" rel="stylesheet"> 
	<script type="text/javascript">
        delete na.site.settings.current.loadingApps;
	</script>
    <style>
        p {
            color : white;
            background : rgba(0,0,0,0.4);
            border-radius : 14px;
        }

        #pageTitle {
            display : inline-block;
        }

        .container {
            display : flex;
            justify-items : center;
            align-items : start;
            justify-content : center;
            align-content : start;
            width : 100%;
            height : 100%;
        }

        .bg {
            display : inline-block;
            background : rgba(0,0,0,0.4);
            border-radius : 14px;
            height : fit-content;
            text-align : center;
        }
        
    </style>
    <div class="container">
    <div class="bg">
        <h1 id="pageTitle" class="naVividTextCSS" style="font-size:200%;">nicer.app music collections</h1>
        <p style="width:350px">
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Sabaton']?>"><span class="contentSectionTitle3_span">Sabaton - 2022 recent hits</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__DJ_Firesnake']?>"><span class="contentSectionTitle3_span">DJ FireSnake</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__DJ_Stiltje']?>"><span class="contentSectionTitle3_span">DJ Stiltje</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Deep_House']?>"><span class="contentSectionTitle3_span">Deep House</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Arabic']?>"><span class="contentSectionTitle3_span">Arabic Tropical Electronic Downtempo</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Creedence']?>"><span class="contentSectionTitle3_span">Creedence Clearwater Revival</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Early_21st_Century']?>"><span class="contentSectionTitle3_span">Early 21st Century</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Black_Horse__Mongolian_Traditional_Classical_Music_Art']?>"><span class="contentSectionTitle3_span">Black Horse - Mongolian Traditional Classical Music Art</span></a>
        <br/><br/>
        <a class="contentSectionTitle3_a naVividTextCSS" href="<?php echo $naURLs['music_index__Beautiful_Chill_Mixes']?>"><span class="contentSectionTitle3_span">Beautiful Chill Mixes</span></a>
        </p>
        <p style="width:350px;">
        Copyright Disclaimer: - Under section 107 of the copyright Act 1976, <a href="https://en.wikipedia.org/wiki/Fair_use" class="contentSectionTitle2_a" target="fairUse">which was reaffirmed in a 2021 court decision</a>, allowance is made for FAIR USE for purpose such a as criticism, comment, news reporting, teaching, scholarship and research. Fair use is a use permitted by copyright statues that might otherwise be infringing. Non- Profit, educational or personal use tips the balance in favor of FAIR USE.
        </p>
    </div>
    </div>
