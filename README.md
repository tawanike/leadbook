# LeadBook

[![Build Status](https://travis-ci.org/tawanike/leadbook.svg?branch=master)](https://travis-ci.org/tawanike/leadbook)

A company listing application that enables users to search for companies and save them
to their favourite's folder.

The demo website can be accessed here https://tawanda-leadbook.herokuapp.com

## Installation

The project is built using Python Django and ReactJS. To setup your development
environment you will need to make sure you have Python 3.5 and NodeJS installed
on your machine.

* Clone the repo onto your machine and CD in the project's root folder.

Run ` pip install -r requirements.txt ` to install all Django dependencies.

Run ` python manage.py migrate ` to run migrations and load test data for companies.

Run ` npm install  ` or if you use yarn ` yarn install` to install all the ReactJS dependencies.

Run ` npm run build ` or using yarn ` yarn build ` to build the ReactJS bundles.


### Development server

The development server runs on ` http://localhost:8000 `

To run API tests ` python manage.py test`. All the tests are found in the tests folder.

To run tests for React ` yarn test `
