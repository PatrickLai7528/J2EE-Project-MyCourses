import StudentAPI from "../api/StudentAPI";

describe("StudentAPI", function(){
    it('should be run without error', function () {
        StudentAPI.getInstance().sendLogIn({email:"hjkl;kj",password:"gjhkl"}).then(r=>console.log(r))
    });
});