# linkedcare-demonstrator

This demonstrator simulates the process of ordering, prescribing, and giving out medication defined by the [Linked Care](https://www.linkedcare.at/) project.
The frontend uses the HL7 FHIR standard for communicating medical data.

## Minimum Browser Requirements

Chrome v98, Edge v98, Safari v15.4, Firefox v94, Opera v84

## Installation

Run `npm install` in the root directory.

## Development

Run `npm run dev` to start all three applications.
The applications can be accessed under:

- [Caregiver Dev](http://127.0.0.1:8080/)
- [Doctor Dev](http://127.0.0.1:8081/)
- [Pharmacy Dev](http://127.0.0.1:8082/)
- [Landingpage Dev](http://127.0.0.1:8083/)

The API connection to the FHIR server is defined inside `vite.config.js` and can be adapted if needed.

## Production

Run `npx run build` to bundle all four applications.
