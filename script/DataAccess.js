"use strict";
var JobSearchApp = JobSearchApp || {};

JobSearchApp.DataAccess = (function () {

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
    client = new MobileServiceClient("https://techjobs.azure-mobile.net/", "yMHpVaLVZGcfABWDybwMWbljdIMMSd81"),
        jobPostingTable = client.getTable("jobPosting"),
        companyInfoTable = client.getTable("companyInfo");


    function saveCompany(comp, success, error) {
        //success = success || function () { };
        //error = error || function () { };


        companyInfoTable.insert(comp).done(function (data) {
            toastr.success("Success"); //Should this come after the success check below?

            if (success) {
                success(data);
            }
        }, function (err) {
            toastr.error("Operation failed"); //Should this come after the error check below?

            if (error) {
                console.log(err);
            }
        });
    }

    function saveJob(job, success, error) {

        jobPostingTable.insert(job).done(function (savedJobData) {
            toastr.success("Your Job data was successfully posted");

            if (success) {
                console.log(savedJobData);
            }
        }, function (err) {
            toastr.error("Error saving your Address");

            if (error) {
                console.log(err);
            }
        });

    }

    function saveAddress(address, success, error) {
        var addressTable = client.getTable("address");

        addressTable.insert(address).done(function (addressData) {
            toastr.success("Address successfully posted");

            if (success) {
                console.log(addressData);
            }
        }, function (err) {
            toastr.error("Operation failed. Address couldn't be saved");

            if (error) {
                console.log(err);
            }
        });

    }

    function getJobs(success, error) {

     jobPostingTable.read().done(function (postedjobs) {
         if (success) {
             success(postedjobs);
         }

     }, function (err) {
         console.log(err);
         if (error) {
             error(err);
         }
     });

    }

    function getCompanyById(companyId, success, error) {

        companyInfoTable.where({ id: companyId }).read().done(function (results) { //really just one company in the array

            if (success) {
                //results will contain just one company
                var company = results[0];

                success(company);
            }

        }, function (err) {
            console.log(err);
            if (error) {
                error(err);
            }
        });

    }

    return {
        saveCompany: saveCompany,
        saveJob: saveJob,
        saveAddress: saveAddress,
        getJobs: getJobs,
        getCompanyById: getCompanyById
    };

})();