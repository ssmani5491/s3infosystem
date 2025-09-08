pipeline {
    agent any
    environment {
        IMAGE_NAME = 's3infosystem'
        GHCR_USER = 'ssmani5491' // Change this!
        GHCR_REGISTRY = 'ghcr.io'
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
        stage('Push to GitHub Registry') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'Github_token', variable: 'GHCR_TOKEN')]) {
                        sh """
                        echo "${GHCR_TOKEN}" | docker login ${GHCR_REGISTRY} -u ${GHCR_USER} --password-stdin
                        docker tag ${IMAGE_NAME} ${GHCR_REGISTRY}/${GHCR_USER}/${IMAGE_NAME}:latest
                        docker push ${GHCR_REGISTRY}/${GHCR_USER}/${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
    }
}
