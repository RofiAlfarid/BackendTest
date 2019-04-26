# BackendTest
Test for Backend

Endpoints 
  - Add ({URI}/server/insert)
    - method: POST
    - Body: - userName
            - identityNumber
            - emailAddress
            - accountNumber
  
  - Read
    method : GET
    by Identity ({URI}/server/{userName}/byidentity)
    by userName ({URI}/server/{userName}/byname)
    
  - Update ({URI}/server/{userName}/update)
    method : PUT
    Body: - userName
          - identityNumber
          - emailAddress
          - accountNumber
          
  - Delete ({URI}/server/{userName}/delete)
    method : GET
    
    
    
  
          
