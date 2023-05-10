import { faker } from '@faker-js/faker';

import { Buyer } from './buyer.interface';
import { Logger } from '../../../common/logger';
import { randomNumber, delay } from '../../../common/utils';

export class BuyerProvider {
  constructor(private readonly logger: Logger) {}

  public static generate(): Buyer {
    const buyer: Buyer = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: {
        line1: faker.address.streetAddress(),
        line2: faker.address.secondaryAddress(),
        postcode: faker.address.zipCode(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      },
    };

    return buyer;
  }

  public async *read(): AsyncGenerator<Array<Buyer>, never> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const randomLength = randomNumber(1, 10);
      const buyers: Array<Buyer> = Array.from({ length: randomLength }).map(
        () => BuyerProvider.generate()
      );

      this.logger.log('Was generated %d buyer(s)', buyers.length);
      yield buyers;
      // TODO: 200ms
      await delay(1000);
    }
  }
}
