import { Follow } from './../profile/follow.entity';
import { BonsaisResponse } from './types/bonsais.response.interface';
import { UpdateBonsaiPublicDTO } from './dto/update.bonsai.publicDTO';
import { UpdateBonsaiDTO } from './dto/update.bonsaiDTO';
import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Bonsai } from './bonsai.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BonsaiResponse } from './types/bonsai.response.interface';

@Injectable()
export class BonsaiService {
  constructor(
    @InjectRepository(Bonsai)
    private bonsaiRepository: Repository<Bonsai>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    private dataSource: DataSource,
  ) {}

  async getAll(currentUser: User, query: any): Promise<BonsaisResponse> {
    const queryBuilder = this.dataSource
      .getRepository(Bonsai)
      .createQueryBuilder('bonsais')
      .leftJoinAndSelect('bonsais.owner', 'owner')
      .andWhere('owner.username = :username', {
        username: currentUser.username,
      });

    const bonsaisCount = await queryBuilder.getCount();

    if (query.limit) queryBuilder.limit(query.limit);

    if (query.offset) queryBuilder.offset(query.offset);

    if (query.species)
      queryBuilder.andWhere('bonsais.species LIKE :species', {
        species: `%${query.species}`,
      });

    const bonsais = await queryBuilder.getMany();
    return { bonsais, bonsaisCount };
  }

  async getFeed(): Promise<Bonsai[]> {
    return await this.bonsaiRepository.find({
      where: {
        isPublic: true,
      },
    });
  }

  async getFeedCustom(currentUser: User, query: any): Promise<BonsaisResponse> {
    //TODO: Fix bonsai count
    const queryBuilder = this.dataSource
      .getRepository(Bonsai)
      .createQueryBuilder('bonsais')
      .leftJoinAndSelect('bonsais.owner', 'owner')
      .andWhere('bonsais.isPublic IS true');

    const bonsaisCount = await queryBuilder.getCount();

    if (query.limit) queryBuilder.limit(query.limit);

    if (query.offset) queryBuilder.offset(query.offset);

    if (query.species)
      queryBuilder.andWhere('bonsais.species LIKE :species', {
        species: `%${query.species}`,
      });

    if (query.owner) {
      queryBuilder.andWhere('owner.username = :username', {
        username: query.owner,
      });
    }

    if (query.favorited) {
      const owner = await this.userRepository.findOne({
        where: {
          username: query.favorited,
        },
        relations: ['favorites'],
      });

      const ids = owner.favorites.map((el) => el.id);
      if (ids.length > 0) {
        queryBuilder.andWhere('bonsais.id IN (:...ids)', { ids });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }

    let favoriteIds: number[] = [];

    if (currentUser.id) {
      const user = await this.userRepository.findOne({
        where: { id: currentUser.id },
        relations: ['favorites'],
      });
      favoriteIds = user.favorites.map((favorite) => favorite.id);
    }

    const bonsais = await queryBuilder.getMany();

    const bonsaisWithFavorited = bonsais.map((bonsai) => {
      const favorited = favoriteIds.includes(bonsai.id);
      return { ...bonsai, favorited };
    });
    return { bonsais: bonsaisWithFavorited, bonsaisCount };
  }

  async getFollowersFeed(
    query: any,
    currentUser: User,
  ): Promise<BonsaisResponse> {
    const users = await this.followRepository.find({
      where: {
        followerId: currentUser.id,
      },
    });

    if (!users.length) return { bonsais: [], bonsaisCount: 0 };

    const followingUserIds = users.map((follow) => follow.followingId);

    const queryBuilder = this.dataSource
      .getRepository(Bonsai)
      .createQueryBuilder('bonsais')
      .leftJoinAndSelect('bonsais.owner', 'owner')
      .where('bonsais.ownerId IN (:...ids)', { ids: followingUserIds });

    queryBuilder.orderBy('bonsais.bonsaiCreationDate', 'DESC');

    if (query.limit) queryBuilder.limit(query.limit);
    if (query.offset) queryBuilder.offset(query.offset);

    const bonsais = await queryBuilder.getMany();

    return { bonsais, bonsaisCount: bonsais.length };
  }

  async updateBonsaiPublic(
    currentUser: User,
    updateBonsaiPublicDTO: UpdateBonsaiPublicDTO,
    id: number,
  ): Promise<Bonsai> {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != currentUser.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    bonsai.isPublic = updateBonsaiPublicDTO.isPublic;

    return await this.bonsaiRepository.save(bonsai);
  }

  async createBonsai(
    currentUser: User,
    createBonsaiDTO: CreateBonsaiDTO,
  ): Promise<Bonsai> {
    const bonsai = new Bonsai();

    Object.assign(bonsai, createBonsaiDTO);

    if (!bonsai.description) bonsai.description = '';
    if (!bonsai.images) bonsai.images = [];
    if (!bonsai.interventions) bonsai.interventions = [];

    bonsai.owner = currentUser;

    return await this.bonsaiRepository.save(bonsai);
  }

  async getBonsaiById(user: User, id: number) {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != user.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    return bonsai;
  }

  async deleteBonsaiById(user: User, id: number) {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != user.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    return await this.bonsaiRepository.delete(id);
  }

  async updateBonsai(
    currentUser: User,
    updateBonsaiDTO: UpdateBonsaiDTO,
    id: number,
  ): Promise<Bonsai> {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != currentUser.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    Object.assign(bonsai, updateBonsaiDTO);

    return await this.bonsaiRepository.save(bonsai);
  }

  async addBonsaiToFavorite(currentUser: User, id: number): Promise<Bonsai> {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: ['favorites'],
    });

    if (!bonsai || (bonsai.isPublic === false && bonsai.owner.id != user.id))
      throw new HttpException(
        'Bonsai not found or it is private',
        HttpStatus.NOT_FOUND,
      );

    const isNotFavorited =
      user.favorites.findIndex(
        (bonsaiInFavorites) => bonsaiInFavorites.id === bonsai.id,
      ) === -1;

    if (isNotFavorited) {
      user.favorites.push(bonsai);
      bonsai.favoritesCount++;

      await this.userRepository.save(user);
      await this.bonsaiRepository.save(bonsai);
    }

    return bonsai;
  }

  async removeBonsaiToFavorite(currentUser: User, id: number): Promise<Bonsai> {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: ['favorites'],
    });

    if (!bonsai)
      throw new HttpException(
        'Bonsai not found or it is private',
        HttpStatus.NOT_FOUND,
      );

    const bonsaiIndex = user.favorites.findIndex(
      (bonsaiInFavorites) => bonsaiInFavorites.id === bonsai.id,
    );

    if (bonsaiIndex >= 0) {
      user.favorites.splice(bonsaiIndex, 1);
      bonsai.favoritesCount--;

      await this.userRepository.save(user);
      await this.bonsaiRepository.save(bonsai);
    }

    return bonsai;
  }

  /// helper

  buildBonsaiResponse(bonsai: Bonsai): BonsaiResponse {
    return {
      bonsai,
    };
  }
}
