import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

class HttpService implements OnModuleInit, OnModuleDestroy {


  async onModuleInit(): Promise<void> {

  }

  async onModuleDestroy(): Promise<void> {

  }

  
}