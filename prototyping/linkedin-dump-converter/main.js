/* global zip, Prism */

import LinkedInToJsonResume from './LinkedInToJsonResume.js';
import csvToArray from './csvtoarray.js';
import save from './file.js';

((() => {
    const filedrag = document.getElementById('filedrag');
    const fileselect = document.getElementById('fileselect');
    let fileName = null;

    // file drag hover
    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type === 'dragover'
            ? 'hover'
            : '');
    }

    const linkedinToJsonResume = new LinkedInToJsonResume();

    const downloadButton = document.querySelector('.download');
    downloadButton.addEventListener('click', () => {
        save(JSON.stringify(linkedinToJsonResume.getOutput(), undefined, 2), 'resume.json');
    });
    downloadButton.style.display = 'none';

    // file selection
    function fileSelectHandler(e) {
        // cancel event and hover styling
        fileDragHover(e);

        const droppedFiles = e.target.files || e.dataTransfer.files;

        const file = droppedFiles[0];
        fileName = file.name;

        const readBlob = blob => {
            return new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = e => {
                    resolve(e.target.result);
                };
                reader.readAsText(blob);
            });
        };

        const readEntryContents = entry => {
            return new Promise(resolve => {
                entry.getData(new zip.BlobWriter('text/plain'), blob => {
                    readBlob(blob).then(resolve);
                });
            });
        };

        const getEntries = (file, onend) => {
            zip.createReader(new zip.BlobReader(file), zipReader => {
                zipReader.getEntries(onend);
            }, onerror);
        };

        getEntries(file, entries => {

            const promises = entries.map(entry => {

                switch (entry.filename) {
                    case 'Skills.csv':
                        return readEntryContents(entry).then(contents => {
                            contents = contents.replace(/"/g, '');
                            let elements = contents.split('\n');
                            elements = elements.slice(1, elements.length - 1);
                            linkedinToJsonResume.processSkills(elements);
                            return;
                        });

                    case 'Education.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const education = elements.slice(1, elements.length - 1).map(elem => ({
                                schoolName: elem[0],
                                startDate: elem[1],
                                endDate: elem[2],
                                notes: elem[3],
                                degree: elem[4],
                                activities: elem[5]
                            }));
                            linkedinToJsonResume.processEducation(education.sort((e1, e2) => (+ e2.startDate.year - + e1.startDate.year) || (+ e2.startDate.month - + e1.startDate.month)));
                            return;
                        });

                    case 'Positions.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const positions = elements.slice(1, elements.length - 1).map(elem => ({
                                companyName: elem[0],
                                description: elem[1],
                                location: elem[2],

                                startDate: {
                                    year: elem[3].split('/')[1],
                                    month: elem[3].split('/')[0]
                                },

                                endDate: elem[4]
                                    ? {
                                        year: elem[4].split('/')[1],
                                        month: elem[4].split('/')[0]
                                    }
                                    : null,

                                title: elem[5]
                            }));
                            linkedinToJsonResume.processPosition(positions.sort((p1, p2) => (+ p2.startDate.year - + p1.startDate.year) || (+ p2.startDate.month - + p1.startDate.month)));
                            return;
                        });

                    case 'Languages.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const languages = elements.slice(1, elements.length - 1).map(elem => ({name: elem[0], proficiency: elem[1]}));
                            linkedinToJsonResume.processLanguages(languages);
                            return;
                        });

                    case 'Recommendations Received.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const recommendations = elements.slice(1, elements.length - 1).map(elem => ({
                                recommenderFirstName: elem[0],
                                recommenderLastName: elem[1],
                                recommendationDate: elem[2],
                                recommendationBody: elem[3],
                                recommenderCompany: elem[4],
                                recommenderTitle: elem[5],
                                displayStatus: elem[6]
                            })).filter(recommendation => recommendation.displayStatus === 'VISIBLE');
                            linkedinToJsonResume.processReferences(recommendations);
                            return;
                        });

                    case 'Profile.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const profile = {
                                firstName: elements[1][0],
                                lastName: elements[1][1],
                                maidenName: elements[1][2],
                                createdDate: elements[1][3],
                                address: elements[1][4],
                                birthDate: elements[1][5],
                                contactInstructions: elements[1][6],
                                maritalStatus: elements[1][7],
                                headline: elements[1][8],
                                summary: elements[1][9],
                                industry: elements[1][10],
                                association: elements[1][11]
                            };
                            linkedinToJsonResume.processProfile(profile);
                            return;
                        });

                    case 'Email Addresses.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents, '\t'); // yes, recommendations use tab-delimiter
                            const email = elements.slice(1, elements.length - 1).map(elem => ({
                                address: elem[0],
                                status: elem[1],
                                isPrimary: elem[2] === 'Yes',
                                dateAdded: elem[3],
                                dateRemoved: elem[4]
                            })).filter(email => email.isPrimary);
                            if (email.length) {
                                linkedinToJsonResume.processEmail(email[0]);
                            }
                            return;
                        });

                    case 'Interests.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            let interests = [];
                            elements.slice(1, elements.length - 1).forEach(elem => {
                                interests = interests.concat(elem[0].split(','));
                            });
                            linkedinToJsonResume.processInterests(interests);
                            return;
                        });

                    case 'Projects.csv':
                        return readEntryContents(entry).then(contents => {
                            const elements = csvToArray(contents);
                            const projects = elements.slice(1, elements.length - 1).map(elem => ({
                                title: elem[0],

                                startDate: {
                                    year: elem[1].split('/')[1],
                                    month: elem[1].split('/')[0]
                                },

                                endDate: elem[2]
                                    ? {
                                        year: elem[2].split('/')[1],
                                        month: elem[2].split('/')[0]
                                    }
                                    : null,

                                description: elem[3],
                                url: elem[4]
                            }));
                            linkedinToJsonResume.processProjects(projects.sort((p1, p2) => (+ p2.startDate.year - + p1.startDate.year) || (+ p2.startDate.month - + p1.startDate.month)));
                            return;
                        });

                    default:
                        return Promise.resolve([]);
                }
            });

            Promise.all(promises).then(() => {
                filedrag.innerHTML = 'Dropped! See the resulting JSON Resume at the bottom.';
                const output = document.getElementById('output');
                output.innerHTML = JSON.stringify(linkedinToJsonResume.getOutput(), undefined, 2);
                Prism.highlightElement(output);
                downloadButton.style.display = 'block';
                document.getElementById('result').style.display = 'block';
            });
        });
    }

    // file select
    fileselect.addEventListener('change', fileSelectHandler, false);

    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
        // file drop
        filedrag.addEventListener('dragover', fileDragHover, false);
        filedrag.addEventListener('dragleave', fileDragHover, false);
        filedrag.addEventListener('drop', fileSelectHandler, false);
        filedrag.style.display = 'block';
    } else {
        filedrag.style.display = 'none';
    }

    document.getElementById('select-file').addEventListener('click', () => {
        fileselect.click();
    });

    zip.workerScriptsPath = `${window.location.pathname}vendor/`;
}))();
