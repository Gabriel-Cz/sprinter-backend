import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sprint, SprintDocument } from './schemas/sprint.schema';
import { CreateSprintDto } from './dto/create-sprint.dto';

@Injectable()
export class SprintService {
    constructor(@InjectModel(Sprint.name) private sprintModel: Model<SprintDocument> ) {}

    async findAll(): Promise<Sprint[]> {
        try {
            return this.sprintModel.find().lean();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: MongooseSchema.Types.ObjectId) {
        try {
            const sprintID = id;
            return this.sprintModel.findById(sprintID).lean();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async create(createSprint: CreateSprintDto): Promise<Sprint> {
        try {
            const createdSprint = new this.sprintModel(createSprint);
            return createdSprint.save();
        } catch(error) {
            throw new InternalServerErrorException(error); 
        }
    }

    async remove(id: MongooseSchema.Types.ObjectId) {
        try {
            const sprintID = id;
            return this.sprintModel.findByIdAndDelete(sprintID);
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}