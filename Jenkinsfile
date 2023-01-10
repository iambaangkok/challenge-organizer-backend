pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }
        stage('test') {
            steps {
                script {
                    try{
                        // bat 'npx playwright install'
                        // bat 'if not exist "playwright-report" mkdir playwright-report'
                        // bat 'npx playwright test --reporter=html'
                        test_ok = true                        
                        emailext attachLog: true, mimeType: 'text/html', attachmentsPattern: 'playwright-report/index.html', body: 'All tests passed.', recipientProviders: [previous(), brokenBuildSuspects(), brokenTestsSuspects()], subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!'
                    }catch(e) {
                        test_ok = false
                        echo e.toString()

                        emailext attachLog: true, mimeType: 'text/html', attachmentsPattern: 'playwright-report/index.html', body: 'See attached report for failed test(s).', recipientProviders: [previous(), brokenBuildSuspects(), brokenTestsSuspects()], subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - TEST FAILED!'
                        // emailext attachLog: true, mimeType: 'text/html', attachmentsPattern: 'playwright-report/report.txt', body: '${FILE, path="playwright-report/report.txt"}', recipientProviders: [previous(), brokenBuildSuspects(), brokenTestsSuspects()], subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!'
                        error "Test Failed"
                    }
                }
            }
        }
        stage('build docker image') {
            when{
                branch 'master'
            }
            steps {
                bat 'docker build -t iambaangkok/challenge-organizer-backend .'
            }
        }
        stage('push image to docker hub') {
            when{
                branch 'master'
            }
            steps {
                script {
                    if (test_ok) {
                        withCredentials([usernamePassword(credentialsId: 'dff12934-5025-4c8d-a205-7ecab8123f22', passwordVariable: 'jenkins-docker-password', usernameVariable: 'jenkins-docker-username')]) {
                            bat 'docker login -u iambaangkok -p %jenkins-docker-password%'
                            bat 'docker push iambaangkok/challenge-organizer-backend'
                        }                        
                    }else{
                        
                    }
                }
            }
        }
        stage('run docker image') {
            when{
                branch 'master'
            }
            steps {
                // bat 'docker pull iambaangkok/challenge-organizer-backend'
                bat 'docker rm -f challenge-organizer-backend'
                bat 'docker run -dp 3030:3000 --name challenge-organizer-backend iambaangkok/challenge-organizer-backend'
                // bat 'docker compose up'
            }
        }
        


    }
    // post {
    //     always {
    //     }

    //     failure {
    //     }

    //     success {
    //     }
    // }
}