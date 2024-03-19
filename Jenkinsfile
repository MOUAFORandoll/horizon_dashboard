pipeline {
    agent any
    environment {
    registry = "mouaforandoll/be_dashboard"
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

                  echo 'stop current   be_dashboard  '
                 
                    script {
                        
                      
                    
                     sh 'docker stop be_dashboard || true'
                     sh 'docker rm -f be_dashboard || true'
                     sh 'docker image prune -f'
                          
                        
                     }
                    
                }
        }   
        
          stage('My run prod') {
          steps {
                echo 'stardd run..'
               script {  
                      sh 'docker pull mouaforandoll/be_dashboard' 
                     sh 'docker run -d --name be_dashboard -p 8000:80 mouaforandoll/be_dashboard:latest'
                     sh "docker rmi -f mouaforandoll/be_dashboard -f"

                  
               
                } 
          }}
        
         }}
         
         