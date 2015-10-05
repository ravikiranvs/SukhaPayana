/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var polyline = require('polyline');

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Routes =  require('../api/route/route.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Routes.find({}).remove(function() {
  Routes.create({
    FBID: "1072158579462254",
    GoogleRouteReq: {
      "origin":{
        "lat":12.986032,
        "lng":77.69376799999998},
      "destination":{
        "lat":12.933679,
        "lng":77.540617
      },
      "provideRouteAlternatives":true,
      "travelMode":"DRIVING",
      "waypoints":[
        {
          "location":{
            "lat":12.921667276118518,
            "lng":77.66181707382202
          },
          "stopover":false
        },
        {
          "location":{
            "lat":12.916731454193258,
            "lng":77.59828090667725
          },
          "stopover":false
        },
        {
          "location":{
            "lat":12.93204054995874,
            "lng":77.54154682159424
          },
          "stopover":false
        }
      ]
    },
    polyline: "_kgnAqqeyMJgCBEREbAKNCzAFRJ\\@d@?dACd@?b@@b@T`@HBGJGN@HL?FNXt@rAzAtC|F}CdIcETF|Ay@pDkBpTkKxJaFtBcAbE{BrH{DpIoEbCaAdA]\\EpBKrCF|G`@tDVjL`AfHp@xAHv@@xCCzBB`BHhBRfGpAdLhB`Ft@lBRxNxAtC`@pB^fEbApCr@rLvCrA\\r@VdAb@hCpAlBz@`@TdFbC`CpAlAx@`Av@hDlDjCxC|GzHdEvEvGlHpIlJxF|Gp@~@h@`Ar@|A~AdEvFlOdBrE^z@vGvQ|@~B~C`I^jAp@tBbE|LtCbIpCdHhFbNT~@@VBVAt@Ir@Kl@eBxIYbB_A|Ga@zBk@lCaA|DaAfDeB~Gg@nCQlA_@tDD^sA|KALWEfAiJLw@AiA`@kC@iAHaA\\kBx@cDtEyQZiBl@oDh@_EVcBRBb@sBH]?e@f@kCJgAAe@a@aB\\EPEDGVv@F^g@JA_@JCTGF^@bAC`@Id@qB~J]hBMEa@xC_A~FmBjIcC~I}@|DYhBe@rE_AbI}@vIErAB|AN~FDp@TzAZjAv@fBr@fAp@z@`FbG~@`A|I~GrDbC~B`Bp@j@fB`B`AfAl@p@JFVNhArA\\n@Rb@d@rAn@hCNrA@fAEt@YbD[jFMVQ~Bg@fOo@`RCfBGl@sAnH{@bEMz@ElA?xADhAj@hG\\dBjBvIh@jCTr@NnABrDFnD?bDWxFKbBMvCEpLMxVAnECdDEtEExGFbEIdG?xICbBGbFA`IIjGGnAAjH?jCAtAGfHY~XCbQKtKG|H?lDJ|BCjBCXGTe@z@[hAIz@CnA?vDAvCE\\GZCnAJb@VXx@f@VNVRBZn@lCLjBBv@E`BDfAj@xBFRJLdAh@d@TPLJ^Ll@mErAeCbAk@Lw@H{ACOr@OfAoAzH_AvGtErAd@p@_Cx@iAf@}AbAo@l@a@j@a@`Ay@|AURUJk@ToDbAOJKPUhCUvBOz@EtAI\\GJCPiAzFoBlIkCvLeAvEyAhGw@pByBnFsAjC}@`By@nAaDhE_DlE{BnCwAhB{AhB}DdEk@r@sAhBy@pAq@x@aBvB{@nAmE~Ga@p@m@pAe@QsEs@mE_AyAWiFa@b@yDvHpBnAV`Fx@jA?PItAkBF]",
    Route: {type: 'LineString', coordinates: polyline.decode("_kgnAqqeyMJgCBEREbAKNCzAFRJ\\@d@?dACd@?b@@b@T`@HBGJGN@HL?FNXt@rAzAtC|F}CdIcETF|Ay@pDkBpTkKxJaFtBcAbE{BrH{DpIoEbCaAdA]\\EpBKrCF|G`@tDVjL`AfHp@xAHv@@xCCzBB`BHhBRfGpAdLhB`Ft@lBRxNxAtC`@pB^fEbApCr@rLvCrA\\r@VdAb@hCpAlBz@`@TdFbC`CpAlAx@`Av@hDlDjCxC|GzHdEvEvGlHpIlJxF|Gp@~@h@`Ar@|A~AdEvFlOdBrE^z@vGvQ|@~B~C`I^jAp@tBbE|LtCbIpCdHhFbNT~@@VBVAt@Ir@Kl@eBxIYbB_A|Ga@zBk@lCaA|DaAfDeB~Gg@nCQlA_@tDD^sA|KALWEfAiJLw@AiA`@kC@iAHaA\\kBx@cDtEyQZiBl@oDh@_EVcBRBb@sBH]?e@f@kCJgAAe@a@aB\\EPEDGVv@F^g@JA_@JCTGF^@bAC`@Id@qB~J]hBMEa@xC_A~FmBjIcC~I}@|DYhBe@rE_AbI}@vIErAB|AN~FDp@TzAZjAv@fBr@fAp@z@`FbG~@`A|I~GrDbC~B`Bp@j@fB`B`AfAl@p@JFVNhArA\\n@Rb@d@rAn@hCNrA@fAEt@YbD[jFMVQ~Bg@fOo@`RCfBGl@sAnH{@bEMz@ElA?xADhAj@hG\\dBjBvIh@jCTr@NnABrDFnD?bDWxFKbBMvCEpLMxVAnECdDEtEExGFbEIdG?xICbBGbFA`IIjGGnAAjH?jCAtAGfHY~XCbQKtKG|H?lDJ|BCjBCXGTe@z@[hAIz@CnA?vDAvCE\\GZCnAJb@VXx@f@VNVRBZn@lCLjBBv@E`BDfAj@xBFRJLdAh@d@TPLJ^Ll@mErAeCbAk@Lw@H{ACOr@OfAoAzH_AvGtErAd@p@_Cx@iAf@}AbAo@l@a@j@a@`Ay@|AURUJk@ToDbAOJKPUhCUvBOz@EtAI\\GJCPiAzFoBlIkCvLeAvEyAhGw@pByBnFsAjC}@`By@nAaDhE_DlE{BnCwAhB{AhB}DdEk@r@sAhBy@pAq@x@aBvB{@nAmE~Ga@p@m@pAe@QsEs@mE_AyAWiFa@b@yDvHpBnAV`Fx@jA?PItAkBF]")}
  },{
    FBID: "1072158579462254",
    GoogleRouteReq: {
      "origin":{
        "lat":12.986032,
        "lng":77.69376799999998
      },
      "destination":{
        "lat":12.958266,
        "lng":77.51888400000007
      },
      "provideRouteAlternatives":true,
      "travelMode":"DRIVING",
      "waypoints":[
        {
          "location":{
            "lat":12.91706608927013,
            "lng":77.62287139892578
          },
          "stopover":false
        },
        {
          "location":{
            "lat":12.925097196619307,
            "lng":77.5499153137207
          },
          "stopover":false
        }
      ]
    },
    polyline: "_kgnAqqeyMNmCREbAKNCzAFRJbA@dAChA@b@T`@HBGJGN@HL?FdAlBzAtC|F}CdIcETF|Ay@pDkBpTkKxJaFtBcAbE{BdSkKbCaAdA]\\EpBKrCFrMx@jL`AfHp@xAHpEAzBB`BHhBRfGpAdLhBnIhAxNxAtC`@pB^fEbApCr@fOtDr@VdAb@hCpAlBz@`@TdFbC`CpAnCpBhDlDjCxCbNrOvGlHpIlJxF|Gp@~@h@`Ar@|A~AdEvFlOdCnGtIvU~DlKp@tBbE|LtCbIpCdHhFbNT~@@VBVAt@Ir@qBfKyA`KmAhGaA|DaAfDeB~Gg@nCQlAu@zG_B`OKzAAzALhFNhC^jB\\hAzAlCrH`JnIxGlA~@|E~CdCpBhBfBnAxAXNf@f@|@pAVd@Pb@t@bCZvAFl@B|@At@KjAm@bJMTC\\QvCm@~Pe@rNT?CdBMbAuCxNKzA@hBPlEHNtAj@n@BjAKfIeD|Ak@lYeO|@e@j@i@~GqDrDkBNn@OJkLbGcA^uBbA}YpOeIvD_H`DeFpCcEvCuDpBeBr@g@T}DjBJh@?XZLXN^XnCbClDbCdAf@K\\rAZLPGhCKfEMrEY~KKfEExAGpA`BDnHRpFRP??PKvLApFAjBInKFbEIdG?xInAAfHE~@@HDFHJ@~@B~ABzA@xFGlEM|PeAnBe@hBpIn@`DrApHBp@EdAU~DAvE?rVIp`@Kvb@EhF?dKGxLClBKxBMlA[r@aAdAmDbD{CrBw@f@{InHkHlFy@h@eFxD{Av@wHxBiEvAsEtAeDjAqAr@kA|@w@`AiAbCg@n@m@XoBf@{Ah@QRs@xGKv@At@If@IP_@xBmCrLaCvKqArFkAnFa@xA_D~HNLDFt@Zr@^zA|@tAx@z@FhBRXiAPg@rAwC\\q@ZuAcEqB}CkAmBo@[jAw@pBw@pBaA|B}@bBc@|@aAbBuGbJ_BxBgEjF{AhB}DdE_C|CkBjC}CfEeFbIw@~AkAnC}D|HuCjHg@jAc@r@Y\\c@Zc@NwAZkA\\_Bt@}GrDeCtA_FdCmKvEgDbBk@`@y@t@mAfBs@dB}BvIoCnJc@r@i@j@m@d@wBvAkExC{QpMsC|AsBx@yA^kBZk@F}AJoDH_HJq@Lw@\\g@^k@x@_@bA[xAm@hC_@|@Q\\PHeAjBUd@g@lAgAbDeCzJm@x@KHAUAEI]GM`@s@X}@x@iDdBeGh@wAdAqBNDn@kAd@iAbAoEb@qA",
    Route: {type: 'LineString', coordinates: polyline.decode("_kgnAqqeyMNmCREbAKNCzAFRJbA@dAChA@b@T`@HBGJGN@HL?FdAlBzAtC|F}CdIcETF|Ay@pDkBpTkKxJaFtBcAbE{BdSkKbCaAdA]\\EpBKrCFrMx@jL`AfHp@xAHpEAzBB`BHhBRfGpAdLhBnIhAxNxAtC`@pB^fEbApCr@fOtDr@VdAb@hCpAlBz@`@TdFbC`CpAnCpBhDlDjCxCbNrOvGlHpIlJxF|Gp@~@h@`Ar@|A~AdEvFlOdCnGtIvU~DlKp@tBbE|LtCbIpCdHhFbNT~@@VBVAt@Ir@qBfKyA`KmAhGaA|DaAfDeB~Gg@nCQlAu@zG_B`OKzAAzALhFNhC^jB\\hAzAlCrH`JnIxGlA~@|E~CdCpBhBfBnAxAXNf@f@|@pAVd@Pb@t@bCZvAFl@B|@At@KjAm@bJMTC\\QvCm@~Pe@rNT?CdBMbAuCxNKzA@hBPlEHNtAj@n@BjAKfIeD|Ak@lYeO|@e@j@i@~GqDrDkBNn@OJkLbGcA^uBbA}YpOeIvD_H`DeFpCcEvCuDpBeBr@g@T}DjBJh@?XZLXN^XnCbClDbCdAf@K\\rAZLPGhCKfEMrEY~KKfEExAGpA`BDnHRpFRP??PKvLApFAjBInKFbEIdG?xInAAfHE~@@HDFHJ@~@B~ABzA@xFGlEM|PeAnBe@hBpIn@`DrApHBp@EdAU~DAvE?rVIp`@Kvb@EhF?dKGxLClBKxBMlA[r@aAdAmDbD{CrBw@f@{InHkHlFy@h@eFxD{Av@wHxBiEvAsEtAeDjAqAr@kA|@w@`AiAbCg@n@m@XoBf@{Ah@QRs@xGKv@At@If@IP_@xBmCrLaCvKqArFkAnFa@xA_D~HNLDFt@Zr@^zA|@tAx@z@FhBRXiAPg@rAwC\\q@ZuAcEqB}CkAmBo@[jAw@pBw@pBaA|B}@bBc@|@aAbBuGbJ_BxBgEjF{AhB}DdE_C|CkBjC}CfEeFbIw@~AkAnC}D|HuCjHg@jAc@r@Y\\c@Zc@NwAZkA\\_Bt@}GrDeCtA_FdCmKvEgDbBk@`@y@t@mAfBs@dB}BvIoCnJc@r@i@j@m@d@wBvAkExC{QpMsC|AsBx@yA^kBZk@F}AJoDH_HJq@Lw@\\g@^k@x@_@bA[xAm@hC_@|@Q\\PHeAjBUd@g@lAgAbDeCzJm@x@KHAUAEI]GM`@s@X}@x@iDdBeGh@wAdAqBNDn@kAd@iAbAoEb@qA")}
  }, function() {
      console.log('finished populating users');
    }
  );
});