import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class LocationProps {
  type: string;
  coordinates: string[];
}
@Schema()
export class PickUpPoint extends Document {
  @Prop()
  establishment: string;

  @Prop()
  address: string;

  @Prop()
  number: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  region: string;

  @Prop({ index: true, type: LocationProps })
  location!: LocationProps;

  @Prop()
  distance!: string;

  @Prop({ required: false, default: true })
  enable!: boolean;

  @Prop()
  uuid!: string;
}
const PickUpPointSchema = SchemaFactory.createForClass(PickUpPoint);
PickUpPointSchema.index({ location: '2dsphere' });

export { PickUpPointSchema };
