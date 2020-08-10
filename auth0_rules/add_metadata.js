function (user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    // short-circuit if the user signed up already
    if (user.app_metadata.username) return callback(null, user, context);
    // first time login/signup
    user.app_metadata.username = user.app_metadata.username || user.username;
    user.app_metadata.school = "SMAN 90";
    user.app_metadata.grade = "10 IPA 1";

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
            const namespace = 'https://localschool.dermagakode.com/';
                context.idToken[namespace + 'school'] = user.app_metadata.school;
                context.idToken[namespace + 'grade'] = user.app_metadata.grade;
            callback(null, user, context);
        })
        .catch(function(err){
            callback(err);
        });
}
