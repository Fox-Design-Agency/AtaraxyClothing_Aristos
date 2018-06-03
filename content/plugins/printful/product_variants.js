const express = require("express")
const router = express.Router();
// const isAdmin = auth.isAdmin;

module.exports = (product, color, size) => {
    switch (product) {
        case "tultex":
            switch (color) {
                case "black_white":
                    switch (size) {
                        case "xsm":
                            return 8158
                        case "sm":
                            return 8159
                        case "md":
                            return 8160
                        case "lg":
                            return 8161
                        case "xlg":
                            return 8162
                        case "2xlg":
                            return 8163
                            break;
                        default:
                            return
                    }
                case "heatherdenim_navy":
                    switch (size) {
                        case "xsm":
                            return 8305
                        case "sm":
                            return 8306
                        case "md":
                            return 8307
                        case "lg":
                            return 8308
                        case "xlg":
                            return 8309
                        case "2xlg":
                            return 8310
                            break;
                        default:
                            return
                    }
                case "heathergrey_black":
                    switch (size) {
                        case "xsm":
                            return 8152
                        case "sm":
                            return 8153
                        case "md":
                            return 8154
                        case "lg":
                            return 8155
                        case "xlg":
                            return 8156
                        case "2xlg":
                            return 8157
                            break;
                        default:
                            return
                    }
                case "heathergrey_heathercharcoal":
                    switch (size) {
                        case "xsm":
                            return 8311
                        case "sm":
                            return 8312
                        case "md":
                            return 8313
                        case "lg":
                            return 8314
                        case "xlg":
                            return 8315
                        case "2xlg":
                            return 8316
                            break;
                        default:
                            return
                    }
                case "heathergrey_heatherred":
                    switch (size) {
                        case "xsm":
                            return 8317
                        case "sm":
                            return 8318
                        case "md":
                            return 8319
                        case "lg":
                            return 8320
                        case "xlg":
                            return 8321
                        case "2xlg":
                            return 8322
                            break;
                        default:
                            return
                    }
                case "heathergrey_navy":
                    switch (size) {
                        case "xsm":
                            return 8323
                        case "sm":
                            return 8324
                        case "md":
                            return 8325
                        case "lg":
                            return 8326
                        case "xlg":
                            return 8327
                        case "2xlg":
                            return 8328
                            break;
                        default:
                            return
                    }
                case "white_black":
                    switch (size) {
                        case "xsm":
                            return 8146
                        case "sm":
                            return 8147
                        case "md":
                            return 8148
                        case "lg":
                            return 8149
                        case "xlg":
                            return 8150
                        case "2xlg":
                            return 8151
                        default:
                            return "something"
                    }
                case "white_heathercharcoal":
                    switch (size) {
                        case "xsm":
                            return 8329
                        case "sm":
                            return 8330
                        case "md":
                            return 8331
                        case "lg":
                            return 8332
                        case "xlg":
                            return 8333
                        case "2xlg":
                            return 8334
                            break;
                        default:
                            return
                    }
                case "white_kelly":
                    switch (size) {
                        case "xsm":
                            return 8335
                        case "sm":
                            return 8336
                        case "md":
                            return 8337
                        case "lg":
                            return 8338
                        case "xlg":
                            return 8339
                        case "2xlg":
                            return 8340
                            break;
                        default:
                            return
                    }
                case "white_navy":
                    switch (size) {
                        case "xsm":
                            return 8164
                        case "sm":
                            return 8165
                        case "md":
                            return 8166
                        case "lg":
                            return 8167
                        case "xlg":
                            return 8168
                        case "2xlg":
                            return 8169
                            break;
                        default:
                            return
                    }
                case "white_red":
                    switch (size) {
                        case "xsm":
                            return 8341
                        case "sm":
                            return 8342
                        case "md":
                            return 8343
                        case "lg":
                            return 8344
                        case "xlg":
                            return 8345
                        case "2xlg":
                            return 8346
                            break;
                        default:
                            return
                    }
                case "white_royal":
                    switch (size) {
                        case "xsm":
                            return 8347
                        case "sm":
                            return 8348
                        case "md":
                            return 8349
                        case "lg":
                            return 8350
                        case "xlg":
                            return 8351
                        case "2xlg":
                            return 8352
                            break;
                        default:
                            return
                    }
                    break
                default:

            }
            break;
        case "all-over":
            switch (size) {
                case "xsm":
                    return 7676
                case "sm":
                    return 7677
                case "md":
                    return 7678
                case "lg":
                    return 7679
                case "xlg":
                    return 7680
                    break;
                default:
                    return
            }
            break
        case "bella_canvas_3413":
            switch (color) {
                case "emerald":
                    switch (size) {
                        case "xsm":
                            return 6520
                        case "sm":
                            return 6521
                        case "md":
                            return 6522
                        case "lg":
                            return 6523
                        case "xlg":
                            return 6524
                        case "2xlg":
                            return 6525
                        case "3xlg":
                            return 6526
                            break;
                        default:
                            return
                    }
                    break
                case "charcoalblack":
                    switch (size) {
                        case "xsm":
                            return 6504
                        case "sm":
                            return 6505
                        case "md":
                            return 6506
                        case "lg":
                            return 6507
                        case "xlg":
                            return 6508
                        case "2xlg":
                            return 6509
                        case "3xlg":
                            return 6510
                            break;
                        default:
                            return
                    }
                    break
                case "black":
                    switch (size) {
                        case "xsm":
                            return 6584
                        case "sm":
                            return 6585
                        case "md":
                            return 6586
                        case "lg":
                            return 6587
                        case "xlg":
                            return 6588
                        case "2xlg":
                            return 6589
                        case "3xlg":
                            return 6590
                            break;
                        default:
                            return
                    }
                    break
                case "brown":
                    switch (size) {
                        case "xsm":
                            return 6496
                        case "sm":
                            return 6497
                        case "md":
                            return 6498
                        case "lg":
                            return 6499
                        case "xlg":
                            return 6500
                        case "2xlg":
                            return 6501
                        case "3xlg":
                            return 6502
                            break;
                        default:
                            return
                    }
                    break
                case "grey":
                    switch (size) {
                        case "xsm":
                            return 6536
                        case "sm":
                            return 6537
                        case "md":
                            return 6538
                        case "lg":
                            return 6539
                        case "xlg":
                            return 6540
                        case "2xlg":
                            return 6541
                        case "3xlg":
                            return 6542
                            break;
                        default:
                            return
                    }
                    break
                case "navy":
                    switch (size) {
                        case "xsm":
                            return 6552
                        case "sm":
                            return 6553
                        case "md":
                            return 6554
                        case "lg":
                            return 6555
                        case "xlg":
                            return 6556
                        case "2xlg":
                            return 6557
                        case "3xlg":
                            return 6558
                            break;
                        default:
                            return
                    }
                    break
                case "athletic_grey":
                    switch (size) {
                        case "xsm":
                            return 6472
                        case "sm":
                            return 6473
                        case "md":
                            return 6474
                        case "lg":
                            return 6575
                        case "xlg":
                            return 6576
                        case "2xlg":
                            return 6577
                        case "3xlg":
                            return 6578
                            break;
                        default:
                            return
                    }
                    break
                case "teal":
                    switch (size) {
                        case "xsm":
                            return 6592
                        case "sm":
                            return 6593
                        case "md":
                            return 6594
                        case "lg":
                            return 6595
                        case "xlg":
                            return 6596
                        case "2xlg":
                            return 6597
                        case "3xlg":
                            return 6598
                            break;
                        default:
                            return
                    }
                    break
                case "true_royal":
                    switch (size) {
                        case "xsm":
                            return 6600
                        case "sm":
                            return 6601
                        case "md":
                            return 6602
                        case "lg":
                            return 6603
                        case "xlg":
                            return 6604
                        case "2xlg":
                            return 6605
                        case "3xlg":
                            return 6606
                            break;
                        default:
                            return
                    }
                    break
                case "clay":
                    switch (size) {
                        case "xsm":
                            return 6512
                        case "sm":
                            return 6513
                        case "md":
                            return 6514
                        case "lg":
                            return 6515
                        case "xlg":
                            return 6516
                        case "2xlg":
                            return 6517
                        case "3xlg":
                            return 6518
                            break;
                        default:
                            return
                    }
                    break
                case "purple":
                    switch (size) {
                        case "xsm":
                            return 6568
                        case "sm":
                            return 6569
                        case "md":
                            return 6570
                        case "lg":
                            return 6571
                        case "xlg":
                            return 6572
                        case "2xlg":
                            return 6573
                        case "3xlg":
                            return 6574
                            break;
                        default:
                            return
                    }
                    break
                case "green":
                    switch (size) {
                        case "xsm":
                            return 6528
                        case "sm":
                            return 6529
                        case "md":
                            return 6530
                        case "lg":
                            return 6531
                        case "xlg":
                            return 6532
                        case "2xlg":
                            return 6533
                        case "3xlg":
                            return 6534
                            break;
                        default:
                            return
                    }
                    break
                case "maroon":
                    switch (size) {
                        case "xsm":
                            return 6544
                        case "sm":
                            return 6545
                        case "md":
                            return 6546
                        case "lg":
                            return 6547
                        case "xlg":
                            return 6548
                        case "2xlg":
                            return 6549
                        case "3xlg":
                            return 6550
                            break;
                        default:
                            return
                    }
                    break
                case "blue":
                    switch (size) {
                        case "xsm":
                            return 6488
                        case "sm":
                            return 6489
                        case "md":
                            return 6490
                        case "lg":
                            return 6491
                        case "xlg":
                            return 6492
                        case "2xlg":
                            return 6493
                        case "3xlg":
                            return 6494
                            break;
                        default:
                            return
                    }
                    break
                case "oatmeal":
                    switch (size) {
                        case "xsm":
                            return 6821
                        case "sm":
                            return 6822
                        case "md":
                            return 6823
                        case "lg":
                            return 6824
                        case "xlg":
                            return 6825
                        case "2xlg":
                            return 6826
                        case "3xlg":
                            return 6827
                            break;
                        default:
                            return
                    }
                    break
                case "white_fleck":
                    switch (size) {
                        case "xsm":
                            return 6608
                        case "sm":
                            return 6609
                        case "md":
                            return 6610
                        case "lg":
                            return 6611
                        case "xlg":
                            return 6612
                        case "2xlg":
                            return 6613
                        case "3xlg":
                            return 6614
                            break;
                        default:
                            return
                    }
                    break
                case "aqua":
                    switch (size) {
                        case "xsm":
                            return 6464
                        case "sm":
                            return 6465
                        case "md":
                            return 6466
                        case "lg":
                            return 6467
                        case "xlg":
                            return 6468
                        case "2xlg":
                            return 6469
                        case "3xlg":
                            return 6470
                            break;
                        default:
                            return
                    }
                    break
                case "orange":
                    switch (size) {
                        case "xsm":
                            return 6560
                        case "sm":
                            return 6561
                        case "md":
                            return 6562
                        case "lg":
                            return 6563
                        case "xlg":
                            return 6564
                        case "2xlg":
                            return 6565
                        case "3xlg":
                            return 6566
                            break;
                        default:
                            return
                    }
                    break
                case "berry":
                    switch (size) {
                        case "xsm":
                            return 6480
                        case "sm":
                            return 6481
                        case "md":
                            return 6482
                        case "lg":
                            return 6483
                        case "xlg":
                            return 6484
                        case "2xlg":
                            return 6485
                        case "3xlg":
                            return 6486
                            break;
                        default:
                            return
                    }
                    break
                case "red":
                    switch (size) {
                        case "xsm":
                            return 6576
                        case "sm":
                            return 6577
                        case "md":
                            return 6578
                        case "lg":
                            return 6579
                        case "xlg":
                            return 6580
                        case "2xlg":
                            return 6581
                        case "3xlg":
                            return 6582
                            break;
                        default:
                            return
                    }
                    break
                default:
                    return
                    break;
            }
        default:
            return "couldnt find anything"
            return "something"
    }
}