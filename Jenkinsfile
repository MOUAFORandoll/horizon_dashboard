pipeline {
    agent any
    environment {
    registry = "mouaforandoll/horizon_dashboard"
    registryCredential = 'docker'
    dockerImage = ''
    }
    stages {
        stage('Test') {
            steps {
                echo 'test..'
          
            }
        }
        stage('Build') {
            steps {
                script {
               dockerImage = docker.build registry  + ":$BUILD_NUMBER"
                }
            }
        }  
        stage('deployement') {
            steps {
                echo 'deployement..$'
                script {
              docker.withRegistry( '', registryCredential ) {
                     dockerImage.push('latest')
                  }
               
                   }
                }
                
        }
        
        
          stage('Cleaning Up') {
               
                steps{

                  echo 'stop current   horizon_dashboard  '
                 
                    script {
                        
                      
                    
                     sh 'docker stop horizon_dashboard || true'
                     sh 'docker rm -f horizon_dashboard || true'
                     sh 'docker image prune -f'
                          
                        
                     }
                    
                }
        }   
        
          stage('My run prod') {
          steps {
                echo 'stardd run..'
               script {  
                      sh 'docker pull mouaforandoll/horizon_dashboard' 
                     sh 'docker run -d --name horizon_dashboard -p 8001:80 mouaforandoll/horizon_dashboard:latest'
                     sh "docker rmi -f mouaforandoll/horizon_dashboard -f"

                  
               
                } 
          }}
        
         }}
         
         