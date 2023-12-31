// @ts-nocheck

import { danger, warn } from "danger";
const child_process = require('child_process')

function checkIsBodyEmpty() {
    if (danger.github.pr.body == "") {
        warn("Please add a description to your PR.");
    }
}

function checkIsJiraLinkedInBody() {
    const body = danger.github.pr.body;
    
    if (body.includes("https://wesionary-team.atlassian.net/")) {
        warn("Please add Jira ticket link to your PR.");
    }
}

function runDartFormat() {
    try {
        child_process.execSync('dart format');
    } catch (error) {
        warn(`Dart format failed. Please fix the issues reported by the analyzer. ${error}`);
    }
}

function checkPRChangeSize() {
    const maxLinesOfCode = 1000;
    const changedLinesOfCode = danger.github.pr.additions + danger.github.pr.deletions;
    if (changedLinesOfCode > maxLinesOfCode) {
        warn(`This PR changes too many lines of code. It changes ${changedLinesOfCode} lines, but the maximum allowed is ${maxLinesOfCode} lines.`);
    }
}

function runFlutterAnalyzer() {
    try {
        child_process.execSync('flutter analyze');
    } catch (error) {
        fail(`Flutter analyzer failed. Please fix the issues reported by the analyzer. ${error}`);
    }
}

function runFlutterTest() {
    try {
        child_process.execSync('flutter test');
    } catch (error) {
        fail(`Flutter test failed. Please fix the issues reported. ${error}`);
    }
}

checkIsBodyEmpty()
checkIsJiraLinkedInBody()
runDartFormat()
checkPRChangeSize()
runFlutterAnalyzer()
runFlutterTest()