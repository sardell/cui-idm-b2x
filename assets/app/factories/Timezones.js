angular.module('app')
.factory('Timezones',['$http','$rootScope','$translate',function($http,$rootScope,$translate){

    var timezones=[];

    var GetTimezones=function(locale){
        return $http.get('bower_components/cui-i18n/dist/cui-i18n/angular-translate/timezones/' + locale + '.json');
    };

    var setTimezones=function(language){
        language = language || 'en';
        if(language.indexOf('_')>-1){
            language=language.split('_')[0];
        }
        GetTimezones(language)
        .then(function(res){
            res.data.forEach(function(timezone){
                timezones.push(timezone);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    };

    $rootScope.$on('languageChange',function(e,args){
        setTimezones(args);
    });

    setTimezones($translate.proposedLanguage());

    return timezones;
}]);