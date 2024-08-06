import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enum/role.enum';
import { Roles } from './decorator/roles.decorator';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  // @Roles(Role.ADMIN)
  @RequirePermissions(Permission.CREATE_USER)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    return this.userService.create(createUserDto)

  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}

function RequirePermissions(): (

  target: UserController,

  propertyKey: "create",

  descriptor: TypedPropertyDescriptor<(createUserDto: CreateUserDto) => string>)

  => void | TypedPropertyDescriptor<(createUserDto: CreateUserDto) => string> {

  throw new Error('Function not implemented.')

}

