function validateFile(input) {
   
    const fileTypes = ["csv", "json"]; 
  if (input.files && input.files[0]) {
      const extension = input.files[0].name.split(".").pop().toLowerCase();
       
      isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types


      if (!isSuccess) {

          $(input).closest(".uploadDoc").find(".docErr").show();
          $(input).val(null)

          setTimeout(() => {
               $(input).closest(".uploadDoc").find(".docErr").hide();
          }, 5000)
        
      };

  } 
  }

