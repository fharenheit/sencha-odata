describe("OData", function () {

    beforeEach(function () {
        ST.textField('[reference=queryfield]').and(function (field) {
            field.setValue('');
        });
    });

    it("should load records via OData protocol.", function () {
        ST.button('[text=Load]').click().wait(1000).and(function () {
            ST.grid('[reference=mainlist]').and(function (grid) {
                expect(grid.getStore().getCount()).toBeGreaterThan(0);
            });
        });
    });

    it("should load records with filter query [$top].", function () {
        ST.textField('[reference=queryfield]').type('$top=3').and(function () {
            ST.button('[text=Load]').click().wait(1000).and(function () {
                ST.grid('[reference=mainlist]').and(function (grid) {
                    expect(grid.getStore().getCount()).toBe(3);
                });
            });
        });
    });

    it("should load records with filter query [$filter].", function () {
        ST.textField('[reference=queryfield]').and(function (field) {
            field.setValue("$filter=Gender eq Microsoft.OData.SampleService.Models.TripPin.PersonGender'Female'");
            ST.button('[text=Load]').click().wait(1000).and(function () {
                ST.grid('[reference=mainlist]').and(function (grid) {
                    expect(grid.getStore().getCount()).toBeGreaterThan(0);
                });
            });
        });
    });

    it("should create new record.", function () {
        ST.button('[text=Add Record]').click().and(function () {
            ST.grid('[reference=mainlist]').rowAt(0).and(function (row) {
                row.record.set({
                    FirstName: 'Shinobu',
                    LastName: 'Kawano',
                    Gender: 'Male'
                });

                ST.button('[text=Save Records]').click().and(function () {
                    ST.textField('[reference=queryfield]').type("$filter=FirstName eq 'Shinobu'").and(function () {
                        ST.button('[text=Load]').click().wait(1000).and(function () {
                            ST.grid('[reference=mainlist]').and(function (grid) {
                                expect(grid.getStore().getCount()).toBe(1);
                            });
                        });
                    });
                });
            });
        });
    });

    it("should update record.", function () {
        ST.grid('[reference=mainlist]').rowAt(0).and(function (row) {
            row.record.set({
                FirstName: 'Sota',
                LastName: 'Kawano'
            });

            ST.button('[text=Save Records]').click().and(function () {
                ST.textField('[reference=queryfield]').type("$filter=FirstName eq 'Sota'").and(function () {
                    ST.button('[text=Load]').click().wait(1000).and(function () {
                        ST.grid('[reference=mainlist]').and(function (grid) {
                            expect(grid.getStore().getCount()).toBe(1);
                        });
                    });
                });
            });
        });
    });

    it("should delete record.", function () {
        ST.grid('[reference=mainlist]').rowAt(0).cellAt(3).and(function (cell) {
            cell.click().and(function () {
                ST.button('[text=Save Records]').click().and(function () {
                    ST.textField('[reference=queryfield]').type("$filter=FirstName eq 'Sota'").and(function () {
                        ST.button('[text=Load]').click().wait(1000).and(function () {
                            ST.grid('[reference=mainlist]').and(function (grid) {
                                expect(grid.getStore().getCount()).toBe(0);
                            });
                        });
                    });
                });
            });
        });
    });

    it("should load records via OData protocol again.", function () {
        ST.button('[text=Load]').click().wait(1000).and(function () {
            ST.grid('[reference=mainlist]').and(function (grid) {
                expect(grid.getStore().getCount()).toBeGreaterThan(0);
            });
        });
    });

});