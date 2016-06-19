( function ()
{
    angular.module("contactListApp",[])
        .controller("appController",function ($scope,$http)
        { 
            var refresh = function () {

                console.log("hello world from controller");
                $http.get('/contactList').success(function (response) {
                    console.log("I got the data I requested");
                    $scope.contactList = response;
                    $scope.contact ='';
                });
            };

            refresh();

            $scope.addContact = function()
            {

                console.log($scope.contact);
                $http.post('/contactList', $scope.contact).success(function(response)
                {

                    console.log(response);
                    refresh();
                });

            };

            $scope.remove = function (id)
            {
                    console.log(id);
                $http.delete('/contactList/'+ id).success(function (response)
                {
                    refresh();  

                });

            };

            $scope.edit = function(id)
            {
              $http.get('/contactList/'+ id).success(function (response)
              {
                $scope.contact = response;
              })
            };

            $scope.update = function ()
            {
                $http.put('/contactList/'+ $scope.contact._id, $scope.contact).success(function (response)
                {
                    refresh();
                })

            };


            $scope.deselect  =function (){
                $scope.contact="";
            }

        });
})();