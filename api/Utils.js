
function requestError(res,err) {
    res.status(400).json({
        errors: err.errors
    });
}

function notFoundError(res,noun,id) {
    res.status(404).json({
        errors : {

        }
        name: "SearchError",
        message: "No "+noun+" with id of "+id+" found.",
        short: titleCase(noun)+" not found."
    });
}

function duplicateError(res,noun,err) {
    res.status(409).json({
        name: err.name,
        message: err.message,
        short: "Duplicate "+noun+"."
    });
}

function deletedResponse(res,noun) {
    res.status(200).json({
        message: titleCase(noun)+' deleted.',
    });
}

function createdResponse(res,noun,id) {
    res.status(200).json({
        message: titleCase(noun)+' created.',
        _id : id
    });
}

function modifiedResponse(res,noun,id) {
    res.status(200).json({
        message: titleCase(noun)+' modified.',
        _id : id
    });
}

function titleCase(noun) {
    return noun[0].toUpperCase() + noun.slice(1)
}

module.exports = {
    requestError,
    notFoundError,
    duplicateError,
    deletedResponse,
    createdResponse,
    modifiedResponse
};
