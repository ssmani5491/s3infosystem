pipeline {
    agent any
    environment {
        IMAGE_NAME = 's3infosystem'
        CONTAINER_NAME = 's3infosystem-container'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.IMAGE_NAME}")
                }
            }
        }
        stage('Stop Existing Container') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -q -f name=${env.CONTAINER_NAME}) ]; then
                        docker stop ${env.CONTAINER_NAME}
                        docker rm ${env.CONTAINER_NAME}
                    fi
                    """
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d -p 8080:80 --name ${env.CONTAINER_NAME} ${env.IMAGE_NAME}"
                }
            }
        }
    }
}
