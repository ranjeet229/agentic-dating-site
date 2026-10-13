import mongoose,{Schema} from 'mongoose';
const participant=new Schema({id:String,name:String,city:String,role:String,interests:[String],communication:String,dateStyle:String,intention:String,avatar:String,completion:Number,energy:String,avoid:[String],linkedinUrl:String,instagramUrl:String,sourceMode:String,ageConfirmed:Boolean,consent:Boolean},{timestamps:true});
export const Participant=mongoose.models.Participant||mongoose.model('Participant',participant);
// Additional persisted collections used by the full platform lifecycle.
export const SourceSnapshot=mongoose.models.SourceSnapshot||mongoose.model('SourceSnapshot',new Schema({participantId:String,source:String,evidence:[Schema.Types.Mixed]}));
export const AgentProfile=mongoose.models.AgentProfile||mongoose.model('AgentProfile',new Schema({participantId:String,analysis:Object}));
export const DatingRound=mongoose.models.DatingRound||mongoose.model('DatingRound',new Schema({participants:[String],status:String}));
export const DateSimulation=mongoose.models.DateSimulation||mongoose.model('DateSimulation',new Schema({id:String,participants:[String],turns:[Object],outcome:String,score:Number,idea:String,createdAt:Date}));
export const CompatibilityScore=mongoose.models.CompatibilityScore||mongoose.model('CompatibilityScore',new Schema({participants:[String],score:Number,breakdown:Object}));
export const ConsentRecord=mongoose.models.ConsentRecord||mongoose.model('ConsentRecord',new Schema({participantId:String,confirmed:Boolean,at:Date}));
