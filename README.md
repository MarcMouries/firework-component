@marc/x-snc-firework
===============================================
Displays a firework


## Installation 

1. clone repository
2. npm install
3. snc ui-component develop --open
4. snc configure profile set
5. snc ui-component login {instance_url} basic {user_name} {password}
6. snc ui-component deploy --force


## Notes

Tested with Node version 12.16 as it's the version supported by the ServiceNow CLI

### sub notes
Encountered an error : "Uncaught ReferenceError: process is not defined." Fixed it by installing "react-error-overlay": "^6.0.9"
