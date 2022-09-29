import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { Training } from '../../../../domain/models';
import { PersonalRecord } from '../../../..//domain/models/personal-record.model';
import { AddPersonalRecord } from '../../../..//domain/usecases/personal-record/add-personal-record.usecase';
import { RetrievePersonalRecords } from '../../../../domain/usecases/personal-record/retrieve-personal-records.usecase';
import { ErrorInterceptor } from '../interceptors/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Controller('personal-records')
export class PersonalRecordController {
  constructor(
    private readonly retrievePersonalRecords: RetrievePersonalRecords,
    private readonly addPersonalRecord: AddPersonalRecord,
  ) {}

  @Get()
  async getPersonalRecords(): Promise<PersonalRecord[]> {
    return this.retrievePersonalRecords.handle();
  }

  @Post()
  async postPersonalRecord(
    @Body() training: Training,
  ): Promise<PersonalRecord[] | void> {
    return this.addPersonalRecord.handle(training);
  }
}
