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


    //Clicking on Post a Job Button
    //$(".search-btn").click(function (e) {

    //    $(this).target = "_blank";
    //    window.open($(this).prop("href", "jobsearch.html"));

    //    return false;
    //    e.preventDefault();
    //});

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
                toastr.success("Company info posted to Azure");
                console.log(data);
            }, function (error) {
                toastr.error("Your posting to Azure failed");
                console.log(error);
            });
            
            postJob(1234);
        };

        //POSTING TO JOBPOSTING TABLE
        function postJob(companyId) {
            console.log("inside post job function with id " + companyId);

            var jobPosting = new JobSearchApp.Models.JobPosting({
                jobTitle: $title.val(),
                category: $cat.val(),
                jobDescription: $description.val(),
                hrEmail: $jobEmail.val(),
                companyId: companyId
            });

            JobSearchApp.DataAccess.saveJob (jobPosting, function (data) {
                toastr.success("Job posting was successful");
                console.log(data);
            }, function (error) {
                toastr.error("Your job posting to Azure failed");
                console.log(error);
            });

            postAddress(5678);
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
                console.log( error);
            });

        };

        //DISPLAYING POSTED JOBS TO HOMEPAGE
        //Call azures read() and what to do with returned data
        
        function showJobInfo() {

        }

    });
}());


//function refreshAuthorInfo() {

//    var query = authorInfoTable;
//    query.read().then(function (authors) {
//        var counter = 0;
//        var listAuthorInfo = $.map(authors, function (author) {
//            counter += 1;

//            return $("<tr>")
//                .attr("data-author-id", author.id)
//                .append($("<td>").html(counter))
//                .append($("<td>").html(author.bookTitle).attr("class", "row-title"))
//                .append($("<td>").html(author.firstName).attr("class", "row-fname"))
//                .append($("<td>").html(author.lastName).attr("class", "row-lname"))
//                .append($("<td>").html(author.gender).attr("class", "row-gen"))
//                .append($("<button class='btn btn-danger author-delete'>Delete</button>"))
//                .append($("<button class='btn btn-warning author-edit'>Edit</button>"));
//        });

//        $("#authors").empty().append(listAuthorInfo);
//        $("#summary").html("Total number of Books in George's Library: <strong>" + authors.length + '</strong>');
//        $("#authors").prepend($("<th>Shelf</th> <th>Book Title</th> <th>First Name</th> <th>Last Name</th> <th>Gender</th>"));

//    }).then($("#display").click(function () {

//        refreshAuthorInfo();
//    })

//    );
//}