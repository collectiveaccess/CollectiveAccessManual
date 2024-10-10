---
title: Lists & Authorities
---

# List item intrinsics (ca_list_items)

  ------------------------------------------------------------------------------------------------
  Name           Code         Description                                   Mandatory?   Default
  -------------- ------------ --------------------------------------------- ------------ ---------
  Identifier     idno         The list item identifier. Must follow policy  Depends upon 
                              defined in configured numbering policy if     numbering    
                              app.conf setting                              policy       
                              require_valid_id_number_for_ca_list_items is               
                              set. Must be unique if app.conf setting                    
                              allow_duplicate_id_number_for_ca_list_items                
                              is not set.                                                

  Type           type_id      A value from the list_item_types list         Yes          null
                              indicating the type of the record. Stored as               
                              an internally generated numeric item_id. When              
                              setting this value in a data import or via an              
                              API call the item identifier may be used.                  

  Parent         parent_id    Reference to parent record. Will be null if   No           null
                              no parent is defined. When setting this value              
                              in a data import or via an API call the                    
                              identifier of the parent place may be used.                

  List           list_id      A reference to the list record (ca_lists) of  No           
                              which the list item is a part. Note that a                 
                              list item is always part of a list. It cannot              
                              exist outside of a list. The raw database                  
                              value contained list_id is an internally                   
                              generated numeric list_id. However, when                   
                              setting this intrinsic via an import mapping               
                              or API call you may also use the list\'s                   
                              code.                                                      

  Value          item_value   Value represented by list item. This is       Yes          
                              distinct from the identifier and used to                   
                              convey a text or numeric quantity when                     
                              required.                                                  

  Access         access       Determines visibility of record in            Yes          0
                              public-facing applications such as Pawtucket.              
                              Values are defined in the access_statuses                  
                              list. Typically the list includes values for               
                              \"public\" and \"private\" visibility. For                 
                              historical reasons the value stored in the                 
                              intrinsic is the list item\'s                              
                              [value] field, not its identifer               
                              or label. By convention \"0\" is interpreted               
                              as private and \"1\" as public access,                     
                              although this can be modified or expanded in               
                              app.conf if required.                                      

  Status         status       Records the general cataloguing workflow      Yes          0
                              status of the record. Values are defined in                
                              the workflow_statuses list. For historical                 
                              reasons the value stored in the intrinsic is               
                              the list item\'s [value] field,                
                              not its identifer or label. Unlike access                  
                              values, statuses have no functional impact on              
                              a record. They are merely informations and                 
                              intended to provide a simple, straightforward              
                              way to track the cataloguing process.                      

  Icon           icon         Icon image to display for listitem.           No           

  Color          color        Highlight color for list item in hex format.  No           

  Is enabled?    is_enabled   Flag indicating whether list item is          Yes          0
                              available for use (value set to 1) or not                  
                              available (value is 0).                                    

  Is default?    is_default   Flag indicating whether list item is the      Yes          0
                              default selection for its list (value set                  
                              to 1) or not (value is 0).                                 

  Rank           rank         The sort order position of the list item.     Yes          0
                              Must be a whole number; lower numbers                      
                              indicate higher ranking in sort.                           
  ------------------------------------------------------------------------------------------------

# List intrinsics (ca_lists)

  ----------------------------------------------------------------------------------------
  Name            Code                Description                   Mandatory?   Default
  --------------- ------------------- ----------------------------- ------------ ---------
  List code       list_code           The list identifier. Must be  Yes          
                                      a unique alpha-numeric code                
                                      without spaces or punctuation              
                                      beyond underscores.                        

  Is system list? is_system_list      Flag indicating whether list  Yes          0
                                      is required to support                     
                                      application functionality                  
                                      (value set to 1) or is purely              
                                      for cataloguing purposes                   
                                      (value is 0).                              

  Is              is_hierarchical     Flag indicating whether list  Yes          0
  hierarchical?                       is hierarchical (value set                 
                                      to 1) or flat (value is 0).                

  Use as          use_as_vocabulary   Flag indicating whether list  Yes          0
  vocabulary?                         should be used in vocabulary               
                                      (keyword) lookups (value set               
                                      to 1) or not (value is 0).                 

  Default sort    default_sort        Specifies the default method  Yes          0
                                      to employ to order items in                
                                      this list. Takes a numeric                 
                                      value indicating the sort                  
                                      order: 0 = Sort by list item               
                                      label 1 = Sort by list item                
                                      rank 2 = Sort by list item                 
                                      value 3 = Sort by list item                
                                      identifier                                 
  ----------------------------------------------------------------------------------------
