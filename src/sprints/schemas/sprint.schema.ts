import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Team } from 'src/team/team.schema';

export type SprintDocument = Sprint & Document;

@Schema() 
export class Sprint {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    image: string;
    
    @Prop()
    teamId: String;

    @Prop({ default: Date.now })
    createdAt: Date;
} 

export const SprintSchema = SchemaFactory.createForClass(Sprint);