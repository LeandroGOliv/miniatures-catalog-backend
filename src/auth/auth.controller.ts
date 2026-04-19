import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @UseGuards()
    @Post()

}
