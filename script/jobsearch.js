var JobSearchApp = JobSearchApp || {};


$(function () {
    "use strict";

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
        client = new MobileServiceClient("https://techjobs.azure-mobile.net/", "yMHpVaLVZGcfABWDybwMWbljdIMMSd81"),
        jobPostingTable = client.getTable("jobPosting"),
        addressTable = client.getTable("address"),
        companyInfoTable = client.getTable("companyInfo");

    //Job Posting
    var $title = $("#job-title"),
        $cat = $("input:radio[name=job-category]:checked"),
        $jid = $("#job-id"),
        $description = $("#job-description"),
        $jobEmail = $("#email-resume");

    //Company Info
    var compName = $("#company-name"),
        compEmail = $("#company-email"),
        compUrl = $("#company-url"),
        cid = $("#company-id"),
        tel = $("#phone");

    //Company Address
    var streetAd = $("#street"),
        cityName = $("#city"),
        stateName = $("#state"),
        zip = $("#zip-code");

    $("#job-form").submit(function (e) {

        //var jobTitle = $title.val(),
        //    cat = $cat.val(),
        //    jobId = $jid.val(),
        //    jobDescription = $description.val(),
        //    hrEmail = $jobEmail.val();

       



        var name = compName.val(),
            companyEmail = compEmail.val(),
            url = compUrl.val(),
            companyId = cid.val(),
            phone = tel.val(),
            street = streetAd.val(),
            city = cityName.val(),
            state = stateName.val(),
            zipCode = zip.val();

        //Insert Data into Tables

        //Insert company first, so i can get the companyId to use to establish my foreign key on the job posting and the address

         var cmp = {
             name: name,
             companyEmail: companyEmail,
             url: url,
             phone: phone
         };

         toastr.warning("About to save some data");

         companyInfoTable.insert(cmp).then(function (savedCompany) {

             //create job posting
             postJob(savedCompany.id);

             //save address
             postAddress(savedCompany.id);

         }, function (err) {
             console.log(err);
         })

         function postJob(companyId) {

             var jobPosting = new JobSearchApp.Models.JobPosting({
                 jobTitle: $title.val(),
                 category: $cat.val(),
                 jobId: $jid.val(),
                 jobDescription: $description.val(),
                 hrEmail: $jobEmail.val(),
                 companyId: companyId

             });

             jobPostingTable.insert(jobPosting).then(function (savedJob) {
                 toastr.success("Your company data was Successful");
                 console.log(savedJob);
             });

         }

        function postAddress(companyId){

             addressTable.insert({
                        street: street,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        companyId: companyId
                    }).then(function (savedAddress) {
                            toastr.success("Your address was Successful");
                            console.log(savedAddress);
                    }, function (error) {
                        toastr.error("Error saving your address " + error);
                    });
         }
        e.preventDefault();
    });


}());

//authorInfoTable.insert({
//    bookTitle: bookTitle,
//    firstName: firstName,
//    lastName: lastName,
//    gender: gender
//})
//           .then(function (data) {
//               toastr.success("Your post was successful");
//           }, function (error) {
//               toastr.error("Your error is " + error);
//           });

//clearForm();

//e.preventDefault();
