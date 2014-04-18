"use strict";
var JobSearchApp = JobSearchApp || {};

JobSearchApp.DataAccess = (function () {

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
    client = new MobileServiceClient("https://techjobs.azure-mobile.net/", "yMHpVaLVZGcfABWDybwMWbljdIMMSd81");

    //function saveJob(job, success, error) {
    //    var jobPostingTable = client.getTable("jobPosting");

    //    jobPostingTable.insert(jobPosting).done(function (savedJob) {
    //        toastr.success("Your Job data was successfully posted");
    //        console.log(savedJob);
    //    }, function (error) {
    //        toastr.error("Error saving your address " + error);
    //        console.log("The error is " + error);
    //    });

    //}

    function saveCompany(comp, success, error) {
        success = success || function () { };
        error = error || function () { };

        var companyInfoTable = client.getTable("companyInfo");

        companyInfoTable.insert(comp).done(function (data) {
            toastr.success("Success");

           // if (success) {
                success(data);
           // }
        }, error);
    }

    //function saveAddress(address, success, error) {
    //    var addressTable = client.getTable("address");

    //}

    return {
        saveCompany: saveCompany

    }

})();