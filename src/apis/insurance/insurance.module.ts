import { HttpModule, Module,CacheModule } from '@nestjs/common';

import { InsuranceService } from './insurance.service';

@Module({
    imports: [HttpModule, CacheModule.register(),],
    providers: [InsuranceService],
    exports: [InsuranceService]
})
export class InsuranceModule {}
