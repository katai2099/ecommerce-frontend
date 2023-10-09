pipeline {
    agent any

    stages{

        stage('npm'){
            steps{
                echo 'installing dependencies...'
                sh 'npm ci'
            }
        }
        stage('test'){
            steps{
                echo 'testing the application...'
                sh 'npm run test'
            }
        }
        stage('build'){
            when{
                expression{
                    BRANCH_NAME=='master'
                }
            }
            steps{
                echo 'building the application...'
                sh 'npm run build'
            }
        }
    }
}