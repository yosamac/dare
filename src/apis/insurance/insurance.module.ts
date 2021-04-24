import { HttpModule, Module } from '@nestjs/common';

import { InsuranceService } from './insurance.service';

@Module({
    imports: [HttpModule],
    providers: [InsuranceService],
    exports: [InsuranceService]
})
export class InsuranceModule {}
