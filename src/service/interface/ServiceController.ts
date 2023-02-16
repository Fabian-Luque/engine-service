import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
  Param,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddCommentCommand } from '../application/command/AddCommentCommand';
import { AddEvidenceCommand } from '../application/command/AddEvidenceCommand';
import { AssingWorkerCommand } from '../application/command/AssingWorkerCommand';
import { FinishServiceCommand } from '../application/command/FinishServiceCommand';
import { InitServiceCommand } from '../application/command/InitServiceCommand';
import { RequestSupplyCommand } from '../application/command/RequestSupplyCommand';
import { UpdateDiagnosticCommand } from '../application/command/UpdateDiagnosticCommand';
import { UpdateServiceStateCommand } from '../application/command/UpdateServiceStateCommand';
import { FindServiceByIdQuery } from '../application/query/FindServiceByIdQuery';
import { FindServicesByGarageIdQuery } from '../application/query/FindServicesByGarageIdQuery';
import { FindServicesByUserIdQuery } from '../application/query/FindServicesByUserIdQuery';
import { ErrorMessage } from '../domain/ErrorMessage';

import { FindServicesResponseDTO } from './dto/FindServicesResponse';
import { InitServiceRequestDTO } from './dto/InitServiceRequestDTO';
import { UpdateServiceStateRequestDTO } from './dto/UpdateServiceStateRequestDTO';

import { ResponseDescription } from './ResponseDescription';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  // @Auth()
  @Post('')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseDescription.CREATED,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async initService(@Body() body: InitServiceRequestDTO): Promise<void> {
    // get or create vehicle
    const vehicle = { id: 1, patent: 'CHFY80' };
    // get or create userOwner
    const userOwner = { id: 1, name: 'Fabian' };

    const command = new InitServiceCommand(
      vehicle.id,
      userOwner,
      body.typeService,
      body.commentOwner,
    );
    await this.commandBus.execute(command);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindServicesResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findServiceById(
    // @Headers() header: AuthorizedHeader,
    @Param('id') id: number,
  ): Promise<FindServicesResponseDTO> {
    return this.queryBus.execute(new FindServiceByIdQuery(id));
  }

  @Get('garage/:garageId')
  @UseInterceptors(CacheInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindServicesResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findServiceByGarage(
    @Param('garageId') id: number,
  ): Promise<FindServicesResponseDTO[]> {
    return this.queryBus.execute(new FindServicesByGarageIdQuery(id));
  }

  @Get('user/:userId')
  @UseInterceptors(CacheInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
    type: FindServicesResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findServiceByUser(
    @Param('userId') id: number,
  ): Promise<FindServicesResponseDTO[]> {
    return this.queryBus.execute(new FindServicesByUserIdQuery(id));
  }

  @Put('/:id/state')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async changeState(
    @Param('id') id: number,
    @Body() body: UpdateServiceStateRequestDTO,
  ) {
    const command = new UpdateServiceStateCommand(id, body.state);
    await this.commandBus.execute(command);
  }

  @Post('/:id/comment')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async addComment(@Param('id') id: number, @Body() body) {
    const command = new AddCommentCommand(id, body.detail, body.imgUrl);
    await this.commandBus.execute(command);
  }

  @Post('/:id/evidence')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async addEvidence(@Param('id') id: number, @Body() body) {
    const command = new AddEvidenceCommand(id, body.detail, body.imgUrl);
    await this.commandBus.execute(command);
  }

  @Put('/:id/diagnostic')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async updateDiagnostic(@Param('id') id: number, @Body() body) {
    const command = new UpdateDiagnosticCommand(id, body.diagnostic);
    await this.commandBus.execute(command);
  }

  @Post('/:id/request-supply')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async requestSupply(@Param('id') id: number, @Body() body) {
    const command = new RequestSupplyCommand(id, body.detail, body.imgUrl);
    await this.commandBus.execute(command);
  }

  @Put('/:id/finish')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async finishService(@Param('id') id: number, @Body() body) {
    const command = new FinishServiceCommand(id, body.description);
    await this.commandBus.execute(command);
  }

  @Put('/:id/assing-worker')
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.OK,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async assingWorker(@Param('id') id: number, @Body() body) {
    const command = new AssingWorkerCommand(id, body.userId);
    await this.commandBus.execute(command);
  }
}
