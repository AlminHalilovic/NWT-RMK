'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

   var widgetId1 = grecaptcha.render('captcha', {
       'sitekey': '6LcrtR0TAAAAANuixqNfBk8yhqw_l43gDGiuDx8X',
        'theme': 'light'
    });
    //console.log(widgetId1);


    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        eMail: "",
        firstName: "smt",
        lastName:"smt",
        userName: "",
        password: "",
        confirmPassword: "",
        recaptcha:""

    };

    $scope.signUp = function () {


        
        $scope.registration.recaptcha = grecaptcha.getResponse(widgetId1);
        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Please check your email and confirm your registration. You will be redirected to homepage in 5 seconds";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/home');
        }, 5000);
    }

}]);