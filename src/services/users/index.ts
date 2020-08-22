import AudioCollection from "../../database/model/audios";
import ListenedRecord from "../../database/model/listen";

/**
 * @description => this function will create object
 * mapped with user & audio collection
 * 
 * @param user 
 */
export const newUserDataCreation = async(user:any) =>{
    const audioCol = await AudioCollection.find({}, "_id");

    const collectionNum = audioCol.length;
    let listenRecord = {
        userID: user._id,
        audioRecordID: null
    };

    //creating new object for every audio 
    for(let i=0;i<collectionNum;i++){
        listenRecord.audioRecordID = audioCol[i]._id;
        ListenedRecord.create(listenRecord);
    }
};
