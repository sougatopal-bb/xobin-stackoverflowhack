(function () {
    'use strict';
    
    angular.module('stackoverflowApp.landing')
            .controller('LandingController',LandingController);

    LandingController.$inject=['xmlService','$sce','$q'];
    function LandingController(xmlService,$sce,$q){
        var vm =this;
        var postMasterJson;
        var postLength = 0;
        vm.currentLength = 0;
        vm.currentPost = [];
        var comment;
        vm.loading = true;
        vm.back=back;
        vm.next = next;
        vm.voting = voting;

        var votepref=[];



        vm.trustAsHtml = $sce.trustAsHtml;

        var promiseArray=[xmlService.postIsReady(),xmlService.commentIsReady()];

        $q.all(promiseArray).then(function(){
            
            postMasterJson = xmlService.getPosts();
            postLength = postMasterJson.length;
            renderPage();

            

        })

        function renderPage(){
            vm.loading=true;
            for(var i=vm.currentLength;i<postLength;i++){
                
                  var temp =  angular.copy(postMasterJson[i]);
                  if(temp._Tags){
                    temp.tagList = temp._Tags.slice(1,-1).split("><");
                  }
                  temp.voteFlag=0;
                  vm.currentPost.push(temp);
               
                if(vm.currentPost.length==10){
                    break;
                }

            }
            console.log(vm.currentPost);
            vm.loading=false;
            checkVotes();
        }
        function back(){
            if(vm.currentLength>0){
                vm.currentLength=vm.currentLength -10;
                vm.currentPost=[];
                renderPage();
            }
        }
        function next(){
            if(vm.currentLength<postLength){
                vm.currentLength=vm.currentLength +10;
                vm.currentPost=[];
                renderPage();
            }
        }

        function checkVotes(){
            if(localStorage.votepref){
                votepref=JSON.parse(localStorage.votepref);
                vm.currentPost.forEach(function(res){
                    if(votepref.indexOf(res._Id)>-1){
                        res.voteFlag=1;
                    }
                })
            }
            
        }

        function voting(post){
            if(post.voteFlag==0){
                post.voteFlag=1
                votepref.push(post._Id)
                localStorage.setItem('votepref',JSON.stringify(votepref))

            }else{
                post.voteFlag=0;
                var index = votepref.indexOf(post._Id)
                votepref.splice(index,1);
                localStorage.setItem('votepref',JSON.stringify(votepref))

            }
        }

    }    
   
    
    
})();