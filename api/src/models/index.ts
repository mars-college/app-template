import { Model } from 'mongoose';

import { UserDocument, User } from '../models/User';
import { Manna, MannaDocument } from '../models/Manna';
import { MannaVoucher, MannaVoucherDocument } from '../models/MannaVoucher';
import { ApiKey, ApiKeyDocument } from '../models/ApiKey';

export interface Database {
    User: Model<UserDocument>;
    Manna: Model<MannaDocument>;
    MannaVoucher: Model<MannaVoucherDocument>;
    ApiKey: Model<ApiKeyDocument>;
}

export const models: Database = {
    User,
    Manna,
    MannaVoucher,
    ApiKey,
};
