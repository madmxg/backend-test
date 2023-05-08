import { faker } from '@faker-js/faker';

import { delay, randomNumber } from '../utils';
import { Buyer } from './buyer.interface';

export class BuyerProvider {
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

      yield buyers;
      // TODO: 200ms
      await delay(1000);
    }
  }
}
