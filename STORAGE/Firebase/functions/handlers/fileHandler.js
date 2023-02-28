const admin = require('firebase-admin');


exports.getAllFiles = (req, res) => {

    let folder = req.params.folder || 'images';


     // List Storage Buckets
     admin.storage().bucket().getFiles().then((data) => {
        let files = [];
        data[0].forEach((file) => {
            files.push({
                name: file.name,
                size: file.size,
                contentType: file.metadata.contentType,
                timeCreated: file.metadata.timeCreated,
                updated: file.metadata.updated,
                md5Hash: file.metadata.md5Hash,
                mediaLink: file.metadata.mediaLink,
                metadata: file.metadata.metadata,
                bucket: file.metadata.bucket,
                generation: file.metadata.generation,
                metageneration: file.metadata.metageneration,

            });

        });
        return res.json(files);
    })

    .catch((err) => {   
        console.error(err);

    });
};



