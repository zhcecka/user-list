'use strict';

var express = require('express');
var fs = require('fs');
var router = express.Router();
var contacts = require('../data/contacts');

function getContactById(id) {
  var result = contacts.find(function(item) {
    return item.id.toString() === id;
  });
  return result;
}

function deleteContact(id) {
  var result = contacts.filter(function(item) {
    return item.id.toString() !== id;
  });
  return result;
}

function searchContacts(searchString) {
  return contacts.filter(function (contact) {
    return contact.name.toLowerCase().includes(searchString.toLowerCase()) ||
           contact.surname.toLowerCase().includes(searchString.toLowerCase()) ||
           contact.email.toLowerCase().includes(searchString.toLowerCase()) ||
           contact.phone.replace(/[^\w\s]/gi, '').includes(searchString.replace(/[^\w\s]/gi, ''))
  })
}

router.get('/contacts', function (req, res) {
  var filterContacts = contacts;
  if (req.query.search) {
    filterContacts = searchContacts(req.query.search);
  }
  res.set({
    'cache-control': 'private,max-age=10000'
    });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(filterContacts);
})

router.post('/contacts', function (req, res) {
  req.body.id = new Date().getTime();
  contacts.push(req.body);
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
  res.set({
    'cache-control': 'private,max-age=10000'
    });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(contacts);
})

router.put('/contacts', function (req, res) {
  Object.assign(contacts.find(function(item) {
    return item.id === req.body.id
  }), req.body)
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
  res.set({
    'cache-control': 'private,max-age=10000'
    });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(contacts);
})

router.delete('/contacts/:contactId', function(req, res) {
  var id = req.params.contactId;
  var filterContacts = deleteContact(id);
  fs.writeFileSync('./data/contacts.json', JSON.stringify(filterContacts))
  res.set({
    'cache-control': 'private,max-age=10000'
    });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(filterContacts);
})

router.get('/contacts/:contactId', function(req, res) {
  var id = req.params.contactId;
  var contact = getContactById(id);
  res.set({
    'cache-control': 'private,max-age=10000'
    });
  res.header("Access-Control-Allow-Origin", "*");
  res.send(contact);
})

module.exports = router;

