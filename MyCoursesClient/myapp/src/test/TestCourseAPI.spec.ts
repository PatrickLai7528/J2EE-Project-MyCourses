import CourseAPI from "../api/CourseAPI";
import IAPIResponse from "../api/IAPIResponse";

describe("CourseAPI", function(){
    it('should be run without error', function () {
        CourseAPI.getInstance().getAllReleasement().then((response:IAPIResponse)=>{
            console.log(response);
        }).catch((e:any)=>{
            console.log(e);
        })
    });
});