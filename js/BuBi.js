/**
 * BuBi - A Buzzword / Bullshit Bingo Generator built with AngularJS
 * @author Jan Gerrit Wieners <jan@jan-wieners.de> | www.jan-wieners.de
 * Copyright (c) 2015 Jan G. Wieners; Licensed under the MIT License
 */
var buzzwordBingo = angular.module("buzzwordBingo", []);

buzzwordBingo.controller("buzzWordCtrl", function($scope) {

    $scope.placeholder = "Insert, your, comma, separated, buzzwords, here!";

    /*
    $scope.buzzWords = "Textklassifikation,Unstrukturierter Text,Strukturierter Text,XML,Auszeichnungssprache," +
    "TEI, Text Encoding Initiative, Information Retrieval, MySQL, HTML, Hypertext, Wohlgeformtheit, Gültigkeit," +
    "Transformation,XSLT,CSS,DTD,Dokumenttypdefinition,Schema,Tiefensuche,Hofmannsthal,Chuck Norris,Philologinnen," +
    "Konsortium,Grrrml,Modularisierung,Metadaten,MARC,MAB,Dublin Core,Data Mining,Text Mining,Argh!,Wissenspyramide," +
    "Termfrequenz,Inverse Dokumentfrequenz,Algorithmen,VD18,Gewichtung,Cluster,Tatort,Polizei,Levenshtein-Distanz," +
    "Recall,Precision,WTF,Nanooo Nanooo";
    */

    $scope.buzzWords = "";

    // Number of cards to generate
    $scope.cardCount = 4;

    $scope.columns = 5;
    $scope.rows = 5;

    // Separated terms
    $scope.terms = [];

    // Cards, rendered as html table
    $scope.cards = [];

    /**
     * Split words in input array
     */
    $scope.splitWords = function() {

    	if ($scope.buzzWords.length === 0) {
    		return;
    	}

        // Reset terms
        $scope.terms.length = 0;
        var splitWords = $scope.buzzWords.split(",");

        // Filter empty entries
        for (var i = splitWords.length; i--;) {

            if (splitWords[i] !== "") {
                $scope.terms.push(splitWords[i]);
            }
        }

    };

    /**
     * Create a number of $scope.cardCount cards
     */
    $scope.createCards = function() {

        // Reset previously drawn cards
        $scope.cards.length = 0;

        var card, rowCnt, randomBuzz, column;

        if ($scope.terms.length === 0) {
            $scope.splitWords();
        }

        // Create number of $scope.cardCount cards
        for (var i = $scope.cardCount; i--;) {

            // Shuffle buzzwords
            randomBuzz = $scope.shuffle($scope.terms);

            // Create a new card
            card = {
                "name" : "Buzzword Bingo",
                "rows" : []
            };

            for (rowCnt = $scope.rows; rowCnt--;) {

                // Fill the card with buzzwords
                // If there are less buzzwords than $scope.rows * $scope.columns
                // then cards won't get filled completely
                column = randomBuzz.splice(0, $scope.columns);

                card.rows.push(column);
            }

            // Add the newly created card to card array
            $scope.cards.push(card);
        }

        // Show print button
        $("#printCards").fadeIn(6000);

    };

    /**
     * Open printer dialogue to print all cards
     */
    $scope.printCards = function() {

        window.print();
    };

    /**
     * Fisher-Yates Shuffle
     * Implementation from http://rosettacode.org/wiki/Knuth_shuffle#JavaScript
     */
    $scope.shuffle = function (inputArray) {

        var rand, temp, i;

        // Clone the array
        var arr = JSON.parse(JSON.stringify(inputArray));

        for (i = arr.length - 1; i > 0; i -= 1) {

            rand = Math.floor((i + 1) * Math.random());//get random between zero and i (inclusive)
            temp = arr[rand];//swap i and the zero-indexed number
            arr[rand] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

});

jQuery(document).ready(function() {
    $("#printCards").hide();
});


/**
 * jQuery for page scrolling feature
 * Requires jQuery Easing plugin
 */
jQuery(function() {

    jQuery('a.page-scroll').bind('click', function(event) {
        var $anchor = jQuery(this);
        jQuery('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 15
        }, 2500, 'easeInOutExpo');
        event.preventDefault();
    });
});