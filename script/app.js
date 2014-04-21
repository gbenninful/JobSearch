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
        $cat = $("input[name=job-category]"),
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

            JobSearchApp.DataAccess.saveCompany(companyInfo, function (postedCompany) {
                toastr.success("Company info posted to Azure");
                console.log(postedCompany);

                postJob(postedCompany.id);
                postAddress(postedCompany.id);

            }, function (error) {
                toastr.error("Your posting to Azure failed");
                console.log(error);
            });

        };

        //POSTING TO JOBPOSTING TABLE
        function postJob(companyId) {
            console.log("inside post job function with id " + companyId);

            var jobPosting = new JobSearchApp.Models.JobPosting({
                jobTitle: $title.val(),
                category: $("input[name=job-category]:checked").val(),
                jobDescription: $description.val(),
                hrEmail: $jobEmail.val(),
                companyId: companyId
            });


            console.log(jobPosting);
            JobSearchApp.DataAccess.saveJob(jobPosting, function (postedJob) {
                toastr.success("Job posting was successful");
                console.log(postedJob);

                //Navigate to the index page
                window.location = "/JobSearch/index.html";
            }, function (error) {
                toastr.error("Your job posting to Azure failed");
                console.log(error);
            });

        }

        //POSTING TO ADDRESS TABLE
        function postAddress(companyId) {

            var addressPosting = new JobSearchApp.Models.Address({
                street: $streetAd.val(),
                city: $cityName.val(),
                state: $stateName.val(),
                zipCode: $zip.val(),
                companyId: companyId
            });

            JobSearchApp.DataAccess.saveAddress(addressPosting, function (savedAddress) {
                toastr.success("Your addresses were successful posted");
                console.log(savedAddress);
            }, function (error) {
                toastr.error("Error saving your address");
                console.log(error);
            });

        };

    });

    displayJobs();

    function displayJobs() {

        var listings = $(".job-listing");

        JobSearchApp.DataAccess.getJobs(function (allJobs) {
            toastr.success("Jobs fetched");

            allJobs.forEach(function (job) {

                var jobTitle = job.jobTitle;

                //lets get the company's name based on the company Id

                JobSearchApp.DataAccess.getCompanyById(job.companyId, function (company) {
                    
                    //apend to listings div
                    listings.append($("<p>").text("Company: " + company.name + " is hiring for : " + jobTitle));

                });


            })
        });
    }
}());


