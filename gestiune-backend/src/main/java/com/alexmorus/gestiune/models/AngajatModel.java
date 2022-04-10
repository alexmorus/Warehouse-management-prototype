/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.alexmorus.gestiune.models;

import java.time.LocalDate;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author alexmorus
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AngajatModel {
    private String id;
    private String nume;
    private String adresa;
    private String oras;
    private String cnp;
    private LocalDate data_angajarii;
    private String durata_contract;
    private String nrProdPreluate;
}
