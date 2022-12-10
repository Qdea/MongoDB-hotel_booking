import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient({});
const removeProperty = (propKey: any, { [propKey]: propValue, ...rest }: any) => rest;
function toIsoString(date: any) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: any) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}

async function createJson(collectionName: string) {
  const csvToJson = require('convert-csv-to-json');
  const fileInputName = path.join(__dirname, 'csvs', collectionName + '.csv');
  return await csvToJson.getJsonFromCsv(fileInputName);
}

async function main() {
  await base_address()
  await hotel()
  await user()
  await reservation()
  await payment()
  await room()
}
async function room() {
  const period_data = []
  let i = 0;
  while (i < 10_000) {
    period_data.push({
      createdat: toIsoString(new Date()),
      lastupdate: toIsoString(new Date()),
      startdate: toIsoString(new Date()),
      finishdate: toIsoString(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
    })
    i += 1
  }
  const price_data = await createJson('price')
  for (let item of price_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['price'] = Number.parseFloat(item.price)
    item['period'] = period_data[Math.floor(Math.random() * (period_data.length - 1))]
  }
  const room_data = await createJson('room')
  const hotels = await prisma.hotel.findMany()
  for (let item of room_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['amount'] = Number.parseInt(item.amount)
    item['hotelid'] = hotels.map((x) => x.id)[Math.floor(Math.random() * (hotels.length - 1))]
    item['prices'] = price_data.slice(1, Math.floor(Math.random() * (price_data.length - 1)))
  }
  await prisma.$runCommandRaw({
    insert: 'room',
    bypassDocumentValidation: true,
    documents: room_data
  });
}
async function payment() {
  const payment_data = await createJson('payment')
  const users = await prisma.user.findMany()
  const reservations = await prisma.reservation.findMany()
  for (let item of payment_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['paymentdate'] = toIsoString(new Date());
    item['amount'] = Number.parseFloat(item.amount)
    item['userid'] = users.map((x) => x.id)[Math.floor(Math.random() * (users.length - 1))]
    item['reservationid'] = reservations.map((x) => x.id)[Math.floor(Math.random() * (reservations.length - 1))]
    delete item._id
  }
  await prisma.$runCommandRaw({
    insert: 'payment',
    bypassDocumentValidation: true,
    documents: payment_data
  });
}
async function reservation() {
  const users = await prisma.user.findMany()
  const hotels = await prisma.hotel.findMany()
  const reservation_data = await createJson('reservation')
  for (let item of reservation_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['rentaldate'] = toIsoString(new Date());
    item['returndate'] = toIsoString(new Date());
    item['userid'] = users.map((x) => x.id)[Math.floor(Math.random() * (users.length - 1 ))]
    item['hotelid'] = hotels.map((x) => x.id)[Math.floor(Math.random() * (hotels.length - 1))]
    delete item._id
  }
  await prisma.$runCommandRaw({
    insert: 'reservation',
    bypassDocumentValidation: true,
    documents: reservation_data
  });
}
async function user() {
  const hotels = await prisma.hotel.findMany()
  const addresses = await prisma.baseaddress.findMany()
  const user_data = await createJson('user');
  for (let item of user_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['lastlogin'] = toIsoString(new Date());
    item['role'] = ['customer', 'admin', 'moderator'][Math.floor(Math.random() * 2)]
    item['addressid'] = addresses.map((x) => x.id)[Math.floor(Math.random() * (addresses.length - 1))]
    item['hotels'] = hotels.map((x) => x.id).slice(1, Math.floor(Math.random() * (hotels.length - 1)))
    delete item._id;
  }
  await prisma.$runCommandRaw({
    insert: 'user',
    bypassDocumentValidation: true,
    documents: user_data
  });
}

async function hotel() {
  const hotel_type_data = await createJson('hoteltypes')
  for (const item of hotel_type_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
  }
  const fulladdress_data = await createJson('fulladdress')
  for (const item of fulladdress_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['house'] = Number.parseInt(item.house)
    item['building'] = Number.parseInt(item.building)
    const baseaadress = await prisma.baseaddress.findMany()
    item.baseaddressid = baseaadress[Math.floor(Math.random() * (baseaadress.length - 1))].id
  }
  const service_category_data = await createJson('servicecategory')
  for (const item of service_category_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
  }
  const service_data = await createJson('service')
  for (let item of service_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    let v = service_category_data.filter((x: { _id: any; }) => x._id === item.servicecategoryid)[0]
    v = removeProperty('_id', v)
    item['categories'] = [v]
  }
  const hotel_data = await createJson('hotel');
  for (let item of hotel_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['rating'] = Number.parseFloat(item.rating)
    let v = hotel_type_data.filter((x: { _id: any; }) => x._id === item.hoteltypeid)[0]
    v = removeProperty('_id', v)
    item['hoteltype'] = v;
    v = fulladdress_data[Math.floor(Math.random() * (fulladdress_data.length - 1))]
    v = removeProperty('_id', v)
    item['fulladdress'] = v
    v = service_data[Math.floor(Math.random() * (service_data.length - 1))]
    v = removeProperty('_id', v)
    item['services'] = [v]
    delete item._id;
    delete item.fulladdressid;
    delete item.hoteltypeid;
  }
  await prisma.$runCommandRaw({
    insert: 'hotel',
    bypassDocumentValidation: true,
    documents: hotel_data
  });
}

async function base_address() {
  const cnt_data = await createJson('country');
  for (const item of cnt_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
  }
  const city_data = await createJson('city');
  for (let item of city_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    item['country'] = cnt_data.filter((x: { _id: any; }) => x._id === item.countryid)[0];
  }
  const adr_data = await createJson('baseaddress');
  for (let item of adr_data) {
    item['createdat'] = toIsoString(new Date());
    item['lastupdate'] = toIsoString(new Date());
    const city = city_data.filter((x: { _id: any; }) => x._id === item.cityid)[0];
    item['city'] = {
      name: city.name,
      createdat: city.createdat,
      lastupdate: city.lastupdate,
      country: {
        code: city.country.code,
        name: city.country.name,
        createdat: city.country.createdat,
        lastupdate: city.country.lastupdate
      }
    };
    delete item._id;
    delete item.cityid;
  }
  await prisma.$runCommandRaw({
    insert: 'baseaddress',
    bypassDocumentValidation: true,
    documents: adr_data
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });