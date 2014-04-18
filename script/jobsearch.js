"use strict";
var JobSearchApp = JobSearchApp || {};

$(function () {

    //Company Info
    var $compName = $("#company-name"),
        $compEmail = $("#company-email"),
        $compUrl = $("#company-url"),
        $tel = $("#phone");

    //Job Posting
    var $title = $("#job-title"),
        $cat = $("input:radio[name=job-category]:checked"),
        $description = $("#job-description"),
        $jobEmail = $("#email-resume");

    //Company Address
    var $streetAd = $("#street"),
        $cityName = $("#city"),
        $stateName = $("#state"),
        $zip = $("#zip-code");

    $("#job-form").submit(function (e) {
        e.preventDefault();

        postCompanyInfo();


        //POSTING TO COMPANYINFO TABLE  (This post shd be first, to obtain companyId to use as foreign key)
        function postCompanyInfo() {

            var companyInfo = new JobSearchApp.Models.Company({
                name: $compName.val(),
                companyEmail: $compEmail.val(),
                phone: $tel.val(),
                url: $compUrl.val()
            });

            JobSearchApp.DataAccess.saveCompany(companyInfo, function (data) {
                toastr.warning("Yaaaaaaaaaaay George called me back!!!!");
            }, function (error) {
                console.log(error);
            });


            //JobSearchApp.DataAccess.saveCompany(companyInfo);
        };

        //POSTING TO JOBPOSTING TABLE
        function postJob(companyId) {
            console.log("inside post job function with id" + companyId);
            var jobPosting = new JobSearchApp.Models.JobPosting({
                jobTitle: $title.val(),
                category: $cat.val(),
                jobDescription: $description.val(),
                hrEmail: $jobEmail.val(),
                companyId: companyId
            });

            console.log("Posting Job");

        };

        //POSTING TO ADDRESS TABLE
        function postAddress(companyId) {

            var addressPosting = new JobSearchApp.Models.Address({
                street: $streetAd.val(),
                city: $cityName.val(),
                state: $stateName.val(),
                zipCode: $zip.val(),
                companyId: companyId
            });

            addressTable.insert(addressPosting).then(function (savedAddress) {
                toastr.success("Your addresses were successful posted");
                console.log(savedAddress);
            }, function (error) {
                toastr.error("Error saving your address " + error);
                console.log("The error is " + error);
            });
        };

    });
}());


